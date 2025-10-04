"""
Ingestão CAGED: rotina para baixar, preparar e carregar agregados mensais
por CNAE e (futuramente) por bairro/município.

MVP: mock/seed controlado que gera dados plausíveis para Cascavel e escreve na
tabela `empresas_bairro` agregando por CNAE e bairro (distribuição proporcional).

Futuro: integrar com microdados oficiais (FTP PDET) e mapa CNAE↔CBO↔setor.
"""
from dataclasses import dataclass
from typing import List, Dict
import random
from sqlalchemy import text
from config import db


@dataclass
class CagedRegistro:
    ano: int
    mes: int
    cnae_id: int
    admitidos: int
    desligados: int
    saldo: int
    massa_salarial: float


def _listar_bairros() -> List[Dict]:
    rows = db.session.execute(text("SELECT id, nome FROM bairros ORDER BY nome"))
    return [dict(id=r.id, nome=r.nome) for r in rows]


def _listar_cnaes() -> List[Dict]:
    rows = db.session.execute(text("SELECT id, codigo, descricao FROM cnae ORDER BY codigo"))
    return [dict(id=r.id, codigo=r.codigo, descricao=r.descricao) for r in rows]


def _gerar_mock_registros(ano_inicio: int, ano_fim: int, cnaes: List[Dict]) -> List[CagedRegistro]:
    registros: List[CagedRegistro] = []
    for ano in range(ano_inicio, ano_fim + 1):
        for mes in range(1, 13):
            for cnae in cnaes:
                base = random.randint(20, 220)
                admitidos = base + random.randint(-10, 80)
                desligados = max(0, base + random.randint(-30, 40))
                saldo = admitidos - desligados
                massa = float(max(0, admitidos) * random.uniform(1800, 4200))
                registros.append(CagedRegistro(
                    ano=ano, mes=mes, cnae_id=cnae['id'],
                    admitidos=admitidos, desligados=desligados,
                    saldo=saldo, massa_salarial=round(massa, 2)
                ))
    return registros


def _distribuir_por_bairro(valor_total: int, bairros: List[Dict]) -> Dict[int, int]:
    if not bairros:
        return {}
    pesos = [random.uniform(0.5, 1.5) for _ in bairros]
    soma = sum(pesos)
    alocados: Dict[int, int] = {}
    acumulado = 0
    for i, b in enumerate(bairros):
        if i == len(bairros) - 1:
            alocados[b['id']] = max(0, valor_total - acumulado)
        else:
            q = int(round(valor_total * (pesos[i] / soma)))
            alocados[b['id']] = max(0, q)
            acumulado += q
    return alocados


def ingest_caged_mock(ano_inicio: int = 2019, ano_fim: int = 2023) -> Dict:
    """
    Gera séries mensais mock do CAGED e injeta na tabela `empresas_bairro`.

    Convenções usadas:
    - empresas_abertas ≈ admitidos (proxy para dinâmica empresarial)
    - empresas_fechadas ≈ desligados
    - empregos_gerados = admitidos - desligados (>=0)
    - empresas_ativas: acumulado simples por CNAE (proxy), anualizado
    - massa_salarial: massa total mensal associada às admissões
    """
    bairros = _listar_bairros()
    cnaes = _listar_cnaes()
    if not bairros or not cnaes:
        return { 'ok': False, 'msg': 'Necessário ter bairros e CNAEs cadastrados' }

    registros = _gerar_mock_registros(ano_inicio, ano_fim, cnaes)

    # Limpa período alvo
    db.session.execute(text("DELETE FROM empresas_bairro WHERE ano BETWEEN :i AND :f"),
                       { 'i': ano_inicio, 'f': ano_fim })

    # Acumulador para empresas_ativas anual por CNAE
    ativos_por_cnae_ano: Dict[tuple, int] = {}

    # Inserções mensais distribuídas por bairro
    insert_sql = text(
        """
        INSERT INTO empresas_bairro (
            bairro_id, cnae_id, ano, mes,
            empresas_ativas, empresas_abertas, empresas_fechadas,
            empregos_gerados, massa_salarial
        ) VALUES (
            :bairro_id, :cnae_id, :ano, :mes,
            :empresas_ativas, :empresas_abertas, :empresas_fechadas,
            :empregos_gerados, :massa_salarial
        )
        ON CONFLICT (bairro_id, cnae_id, ano, mes) DO UPDATE SET
            empresas_ativas = EXCLUDED.empresas_ativas,
            empresas_abertas = EXCLUDED.empresas_abertas,
            empresas_fechadas = EXCLUDED.empresas_fechadas,
            empregos_gerados = EXCLUDED.empregos_gerados,
            massa_salarial = EXCLUDED.massa_salarial
        """
    )

    for reg in registros:
        dist_adm = _distribuir_por_bairro(reg.admitidos, bairros)
        dist_des = _distribuir_por_bairro(reg.desligados, bairros)
        dist_massa = _distribuir_por_bairro(int(reg.massa_salarial), bairros)

        chave = (reg.cnae_id, reg.ano)
        ativos_por_cnae_ano[chave] = ativos_por_cnae_ano.get(chave, 0) + max(0, reg.saldo)

        for b in bairros:
            bairro_id = b['id']
            abertas = dist_adm.get(bairro_id, 0)
            fechadas = dist_des.get(bairro_id, 0)
            empregos = max(0, abertas - fechadas)
            massa = float(dist_massa.get(bairro_id, 0))
            db.session.execute(insert_sql, {
                'bairro_id': bairro_id,
                'cnae_id': reg.cnae_id,
                'ano': reg.ano,
                'mes': reg.mes,
                'empresas_ativas': 0,  # preenche após anualizar
                'empresas_abertas': abertas,
                'empresas_fechadas': fechadas,
                'empregos_gerados': empregos,
                'massa_salarial': massa,
            })

    # Atualiza empresas_ativas anual com acumulado por CNAE
    for (cnae_id, ano), ativos in ativos_por_cnae_ano.items():
        db.session.execute(text(
            """
            UPDATE empresas_bairro
            SET empresas_ativas = :ativos
            WHERE cnae_id = :cnae_id AND ano = :ano
            """
        ), { 'ativos': int(ativos), 'cnae_id': cnae_id, 'ano': ano })

    db.session.commit()
    return { 'ok': True, 'msg': f'Ingestão mock CAGED concluída {ano_inicio}-{ano_fim}', 'cnaes': len(cnaes), 'bairros': len(bairros) }


def cli_ingest_caged(ano_inicio: int = 2019, ano_fim: int = 2023):
    """Wrapper CLI para docker exec."""
    return ingest_caged_mock(ano_inicio, ano_fim)


