"""
Ingestão de empresas: gera cadastro individual mock com CNPJ → Endereço → Bairro
e depois agrega para alimentar a tabela empresas_bairro.

Demonstra a funcionalidade completa do sistema de rastreabilidade.
"""
import random
from datetime import datetime, timedelta
from typing import List, Dict
from sqlalchemy import text
from config import db


# Dados mock para gerar nomes realistas
PREFIXOS_EMPRESA = [
    "Comercial", "Serviços", "Indústria", "Transportadora", "Construtora",
    "Distribuidora", "Mercado", "Farmácia", "Padaria", "Restaurante",
    "Bar", "Lanchonete", "Confeitaria", "Açougue", "Papelaria",
    "Auto Peças", "Materiais", "Eletrônica", "Informática", "Móveis",
    "Confecções", "Calçados", "Joalheria", "Ótica", "Pet Shop"
]

SUFIXOS_EMPRESA = [
    "Ltda", "EIRELI", "ME", "S.A.", "& Cia", "Comércio e Serviços",
    "do Paraná", "de Cascavel", "Regional", "Central"
]

LOGRADOUROS = [
    "Rua das Flores", "Avenida Brasil", "Rua Paraná", "Avenida Tancredo Neves",
    "Rua Pernambuco", "Rua dos Pioneiros", "Avenida Carlos Gomes",
    "Rua Mato Grosso", "Rua Santa Catarina", "Avenida Barão do Rio Branco",
    "Rua Maranhão", "Rua Sergipe", "Rua Amazonas", "Rua Rio Grande do Sul",
    "Rua São Paulo", "Rua Paraíba", "Rua Bahia", "Rua Ceará",
    "Rua Espírito Santo", "Rua Goiás", "Rua Piauí", "Rua Alagoas"
]

SITUACOES = ["ATIVA", "BAIXADA", "SUSPENSA", "INAPTA"]
PORTES = ["ME", "EPP", "DEMAIS"]
NATUREZAS = [
    "Empresário Individual", "Sociedade Empresária Limitada",
    "Sociedade Simples Limitada", "EIRELI", "S.A. - Sociedade Anônima"
]


def _gerar_cnpj() -> str:
    """Gera CNPJ mock formatado (não validado, apenas demonstrativo)."""
    parte1 = random.randint(10, 99)
    parte2 = random.randint(100, 999)
    parte3 = random.randint(100, 999)
    parte4 = random.randint(1, 9999)
    parte5 = random.randint(10, 99)
    return f"{parte1:02d}.{parte2:03d}.{parte3:03d}/{parte4:04d}-{parte5:02d}"


def _gerar_razao_social() -> str:
    """Gera razão social mock."""
    prefixo = random.choice(PREFIXOS_EMPRESA)
    nome = random.choice(["Silva", "Santos", "Oliveira", "Souza", "Costa", 
                          "Lima", "Pereira", "Almeida", "Nascimento", "Rodrigues"])
    sufixo = random.choice(SUFIXOS_EMPRESA)
    return f"{prefixo} {nome} {sufixo}"


def _gerar_endereco(bairro_id: int) -> Dict:
    """Gera endereço mock para um bairro."""
    logradouro = random.choice(LOGRADOUROS)
    numero = str(random.randint(1, 2500))
    complemento = random.choice(["", "Sala 1", "Loja 2", "Conj. A", "Bloco B"]) if random.random() > 0.7 else None
    cep = f"85{random.randint(800, 899)}{random.randint(0, 9)}{random.randint(10, 99):02d}"
    return {
        "logradouro": logradouro,
        "numero": numero,
        "complemento": complemento,
        "cep": cep
    }


def _gerar_data_abertura(ano_inicio: int, ano_fim: int) -> datetime:
    """Gera data de abertura aleatória entre anos."""
    dias = (datetime(ano_fim, 12, 31) - datetime(ano_inicio, 1, 1)).days
    return datetime(ano_inicio, 1, 1) + timedelta(days=random.randint(0, dias))


def _listar_bairros() -> List[Dict]:
    """Lista bairros disponíveis."""
    rows = db.session.execute(text("SELECT id, nome, regiao FROM bairros ORDER BY nome"))
    return [dict(id=r.id, nome=r.nome, regiao=r.regiao) for r in rows]


def _listar_cnaes() -> List[Dict]:
    """Lista CNAEs disponíveis."""
    rows = db.session.execute(text("SELECT id, codigo, descricao, setor FROM cnae ORDER BY codigo"))
    return [dict(id=r.id, codigo=r.codigo, descricao=r.descricao, setor=r.setor) for r in rows]


def gerar_empresas_mock(
    total_empresas: int = 1000,
    ano_inicio: int = 2015,
    ano_fim: int = 2023,
    taxa_baixa: float = 0.15
) -> Dict:
    """
    Gera cadastro mock de empresas individuais com CNPJ → Endereço → Bairro.
    
    Args:
        total_empresas: Quantidade de empresas a gerar
        ano_inicio: Ano inicial para datas de abertura
        ano_fim: Ano final para datas de abertura
        taxa_baixa: Percentual de empresas baixadas (0-1)
    
    Returns:
        Dict com resultado da operação
    """
    bairros = _listar_bairros()
    cnaes = _listar_cnaes()
    
    if not bairros or not cnaes:
        return {
            'ok': False,
            'msg': 'É necessário ter bairros e CNAEs cadastrados antes de gerar empresas'
        }
    
    # Limpa cadastro existente (mock)
    db.session.execute(text("TRUNCATE TABLE empresas_cadastro RESTART IDENTITY CASCADE"))
    
    empresas_geradas = 0
    cnpjs_existentes = set()
    
    insert_sql = text("""
        INSERT INTO empresas_cadastro (
            cnpj, razao_social, nome_fantasia, cnae_id, cnae_codigo, cnae_descricao,
            bairro_id, logradouro, numero, complemento, cep,
            data_abertura, data_situacao_cadastral, situacao_cadastral,
            porte, natureza_juridica, capital_social
        ) VALUES (
            :cnpj, :razao_social, :nome_fantasia, :cnae_id, :cnae_codigo, :cnae_descricao,
            :bairro_id, :logradouro, :numero, :complemento, :cep,
            :data_abertura, :data_situacao_cadastral, :situacao_cadastral,
            :porte, :natureza_juridica, :capital_social
        )
    """)
    
    while empresas_geradas < total_empresas:
        cnpj = _gerar_cnpj()
        
        # Evita duplicatas de CNPJ
        if cnpj in cnpjs_existentes:
            continue
        
        cnpjs_existentes.add(cnpj)
        
        razao_social = _gerar_razao_social()
        nome_fantasia = razao_social.split()[0] + " " + razao_social.split()[1] if len(razao_social.split()) > 1 else razao_social
        
        # Seleciona bairro e CNAE (distribuição ponderada por região)
        bairro = random.choice(bairros)
        cnae = random.choice(cnaes)
        
        endereco = _gerar_endereco(bairro['id'])
        data_abertura = _gerar_data_abertura(ano_inicio, ano_fim)
        
        # Define situação cadastral
        if random.random() < taxa_baixa:
            situacao = "BAIXADA"
            # Data de baixa após abertura
            dias_operacao = random.randint(180, 1825)  # 6 meses a 5 anos
            data_situacao = data_abertura + timedelta(days=dias_operacao)
        else:
            situacao = random.choices(
                ["ATIVA", "SUSPENSA", "INAPTA"],
                weights=[0.90, 0.05, 0.05]
            )[0]
            data_situacao = data_abertura
        
        porte = random.choices(PORTES, weights=[0.70, 0.25, 0.05])[0]
        natureza = random.choice(NATUREZAS)
        capital_social = round(random.uniform(5000, 500000), 2)
        
        db.session.execute(insert_sql, {
            'cnpj': cnpj,
            'razao_social': razao_social,
            'nome_fantasia': nome_fantasia,
            'cnae_id': cnae['id'],
            'cnae_codigo': cnae['codigo'],
            'cnae_descricao': cnae['descricao'],
            'bairro_id': bairro['id'],
            'logradouro': endereco['logradouro'],
            'numero': endereco['numero'],
            'complemento': endereco['complemento'],
            'cep': endereco['cep'],
            'data_abertura': data_abertura,
            'data_situacao_cadastral': data_situacao,
            'situacao_cadastral': situacao,
            'porte': porte,
            'natureza_juridica': natureza,
            'capital_social': capital_social
        })
        
        empresas_geradas += 1
        
        # Commit em lotes para performance
        if empresas_geradas % 100 == 0:
            db.session.commit()
    
    db.session.commit()
    
    return {
        'ok': True,
        'msg': f'Cadastro de {empresas_geradas} empresas gerado com sucesso',
        'total_empresas': empresas_geradas,
        'bairros': len(bairros),
        'cnaes': len(cnaes)
    }


def agregar_para_empresas_bairro(ano_inicio: int = 2019, ano_fim: int = 2023, usar_mock: bool = False) -> Dict:
    """
    Agrega dados do cadastro individual de empresas para a tabela empresas_bairro.
    Gera séries mensais e anuais de movimentação empresarial.
    """
    
    # Limpa agregados existentes
    tabela = 'empresas_bairro_mock' if usar_mock else 'empresas_bairro'
    db.session.execute(text(
        f"DELETE FROM {tabela} WHERE ano BETWEEN :inicio AND :fim"
    ), {'inicio': ano_inicio, 'fim': ano_fim})
    
    # Agrega movimentação mensal (abertura/fechamento)
    agregacao_sql = text(f"""
        INSERT INTO {tabela} (
            bairro_id, cnae_id, ano, mes,
            empresas_ativas, empresas_abertas, empresas_fechadas,
            empregos_gerados, massa_salarial
        )
        SELECT 
            ec.bairro_id,
            ec.cnae_id,
            anos.ano,
            meses.mes,
            -- Empresas ativas: abertas até o período e não baixadas
            COUNT(CASE 
                WHEN ec.data_abertura <= make_date(anos.ano, meses.mes, 1)
                AND (ec.situacao_cadastral != 'BAIXADA' 
                     OR ec.data_situacao_cadastral > make_date(anos.ano, meses.mes, 1))
                THEN 1 
            END) as empresas_ativas,
            -- Empresas abertas no mês
            COUNT(CASE 
                WHEN EXTRACT(YEAR FROM ec.data_abertura) = anos.ano
                AND EXTRACT(MONTH FROM ec.data_abertura) = meses.mes
                THEN 1 
            END) as empresas_abertas,
            -- Empresas fechadas no mês
            COUNT(CASE 
                WHEN ec.situacao_cadastral = 'BAIXADA'
                AND EXTRACT(YEAR FROM ec.data_situacao_cadastral) = anos.ano
                AND EXTRACT(MONTH FROM ec.data_situacao_cadastral) = meses.mes
                THEN 1 
            END) as empresas_fechadas,
            -- Empregos gerados (proxy: 3-15 por empresa nova, dependendo do porte)
            SUM(CASE 
                WHEN EXTRACT(YEAR FROM ec.data_abertura) = anos.ano
                AND EXTRACT(MONTH FROM ec.data_abertura) = meses.mes
                THEN CASE 
                    WHEN ec.porte = 'ME' THEN 3
                    WHEN ec.porte = 'EPP' THEN 8
                    ELSE 15
                END
            END) as empregos_gerados,
            -- Massa salarial (proxy: empregos * salário médio 2500-4000)
            SUM(CASE 
                WHEN EXTRACT(YEAR FROM ec.data_abertura) = anos.ano
                AND EXTRACT(MONTH FROM ec.data_abertura) = meses.mes
                THEN CASE 
                    WHEN ec.porte = 'ME' THEN 3 * 2800
                    WHEN ec.porte = 'EPP' THEN 8 * 3200
                    ELSE 15 * 3800
                END
            END) as massa_salarial
        FROM empresas_cadastro ec
        CROSS JOIN generate_series(:ano_inicio, :ano_fim) AS anos(ano)
        CROSS JOIN generate_series(1, 12) AS meses(mes)
        WHERE ec.data_abertura <= make_date(:ano_fim, 12, 31)
        GROUP BY ec.bairro_id, ec.cnae_id, anos.ano, meses.mes
        HAVING COUNT(*) > 0
        ORDER BY anos.ano, meses.mes, ec.bairro_id, ec.cnae_id
    """)
    
    db.session.execute(agregacao_sql, {
        'ano_inicio': ano_inicio,
        'ano_fim': ano_fim
    })
    
    db.session.commit()
    
    # Estatísticas
    stats = db.session.execute(text(f"""
        SELECT 
            COUNT(*) as total_registros,
            COUNT(DISTINCT bairro_id) as bairros_distintos,
            COUNT(DISTINCT cnae_id) as cnaes_distintos,
            SUM(empresas_abertas) as total_aberturas,
            SUM(empresas_fechadas) as total_fechamentos
        FROM {tabela}
        WHERE ano BETWEEN :inicio AND :fim
    """), {'inicio': ano_inicio, 'fim': ano_fim}).fetchone()
    
    return {
        'ok': True,
        'msg': f'Agregação concluída para {ano_inicio}-{ano_fim} (tabela: {tabela})',
        'total_registros': stats.total_registros,
        'bairros': stats.bairros_distintos,
        'cnaes': stats.cnaes_distintos,
        'total_aberturas': stats.total_aberturas,
        'total_fechamentos': stats.total_fechamentos
    }


def pipeline_completo(
    total_empresas: int = 1000,
    ano_inicio_empresas: int = 2015,
    ano_fim_empresas: int = 2023,
    ano_inicio_agregacao: int = 2019,
    ano_fim_agregacao: int = 2023,
    usar_mock: bool = False
) -> Dict:
    """
    Pipeline completo: gera empresas mock e agrega para empresas_bairro.
    """
    print("📊 Iniciando pipeline de ingestão de empresas...")
    
    # Etapa 1: Gerar empresas
    print(f"📝 1/2 - Gerando {total_empresas} empresas mock...")
    resultado_empresas = gerar_empresas_mock(
        total_empresas=total_empresas,
        ano_inicio=ano_inicio_empresas,
        ano_fim=ano_fim_empresas
    )
    
    if not resultado_empresas['ok']:
        return resultado_empresas
    
    print(f"✅ {resultado_empresas['msg']}")
    
    # Etapa 2: Agregar
    print(f"📈 2/2 - Agregando dados para empresas_bairro ({ano_inicio_agregacao}-{ano_fim_agregacao})...")
    resultado_agregacao = agregar_para_empresas_bairro(
        ano_inicio=ano_inicio_agregacao,
        ano_fim=ano_fim_agregacao,
        usar_mock=usar_mock
    )
    
    if not resultado_agregacao['ok']:
        return resultado_agregacao
    
    print(f"✅ {resultado_agregacao['msg']}")
    print(f"📊 Total: {resultado_agregacao['total_aberturas']} aberturas, {resultado_agregacao['total_fechamentos']} fechamentos")
    
    return {
        'ok': True,
        'msg': 'Pipeline completo executado com sucesso',
        'empresas': resultado_empresas,
        'agregacao': resultado_agregacao
    }

