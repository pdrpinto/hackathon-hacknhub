from typing import Dict
from sqlalchemy import text
from config import db


def _exists(table: str) -> bool:
    row = db.session.execute(text(f"SELECT EXISTS (SELECT 1 FROM {table} LIMIT 1) AS ok"))
    return bool(row.fetchone().ok)


def seed_bairros_minimo() -> int:
    if _exists('bairros'):
        return 0
    sql = text("""
        INSERT INTO bairros (nome, regiao, area_km2, populacao_estimada, densidade_demografica, renda_media_domiciliar, coordenadas_centro, cor_mapa) VALUES
        ('Centro', 'Centro', 3.50, 18500, 5285.71, 4500.00, POINT(-53.455, -24.955), '#2E7D32'),
        ('Coqueiral', 'Norte', 5.50, 25000, 4545.45, 2800.00, POINT(-53.450, -24.935), '#1976D2'),
        ('Esmeralda', 'Sul', 7.80, 32000, 4102.56, 2400.00, POINT(-53.450, -24.985), '#C62828'),
        ('Cascavel Velho', 'Leste', 8.50, 35000, 4117.65, 2200.00, POINT(-53.425, -24.955), '#F57C00'),
        ('Cataratas', 'Oeste', 9.20, 38000, 4130.43, 2100.00, POINT(-53.485, -24.955), '#7B1FA2');
    """)
    db.session.execute(sql)
    db.session.commit()
    return 5


def seed_cnae_minimo() -> int:
    if _exists('cnae'):
        return 0
    sql = text("""
        INSERT INTO cnae (codigo, descricao, setor) VALUES
        ('4711-3/01', 'Comércio varejista de mercadorias em geral', 'Comércio'),
        ('5611-2/01', 'Restaurantes e similares', 'Serviços'),
        ('25.11-0/00', 'Fabricação de estruturas metálicas', 'Indústria'),
        ('8610-1/01', 'Atividades de atendimento hospitalar', 'Saúde');
    """)
    db.session.execute(sql)
    db.session.commit()
    return 4


def seed_indicadores_minimo(ano: int = 2023) -> int:
    # insere se vazio
    row = db.session.execute(text("SELECT COUNT(1) AS n FROM indicadores_bairro")).fetchone()
    if row.n and row.n > 0:
        return 0
    sql = text("""
        INSERT INTO indicadores_bairro (
            bairro_id, ano,
            populacao, taxa_crescimento, densidade,
            matriculas_total, matriculas_fundamental, matriculas_medio,
            escolas_municipais, escolas_estaduais, taxa_alfabetizacao,
            unidades_saude, leitos_disponiveis, atendimentos_mes, taxa_mortalidade_infantil,
            domicilios_total, cobertura_agua, cobertura_esgoto, coleta_lixo, iluminacao_publica,
            consumo_energia_kwh, consumidores_energia,
            empresas_ativas, empregos_formais, renda_media
        )
        SELECT 
            b.id, :ano,
            b.populacao_estimada,
            1.8,
            COALESCE(b.populacao_estimada / NULLIF(b.area_km2,0), 0),
            FLOOR(b.populacao_estimada * 0.15),
            FLOOR(b.populacao_estimada * 0.10),
            FLOOR(b.populacao_estimada * 0.04),
            4, 2, 96.5,
            6, 40, FLOOR(b.populacao_estimada * 0.9), 10.5,
            FLOOR(b.populacao_estimada / 3.2), 94.0, 85.0, 96.0, 98.0,
            FLOOR(b.populacao_estimada * 180), FLOOR(b.populacao_estimada / 3.5),
            FLOOR(b.populacao_estimada * 0.018), FLOOR(b.populacao_estimada * 0.35), 3200.0
        FROM bairros b;
    """)
    res = db.session.execute(sql, {'ano': ano})
    db.session.commit()
    return res.rowcount or 0


def seed_empresas_bairro_minimo(ano: int = 2023) -> int:
    # insere somente se não há registros do ano
    row = db.session.execute(text("SELECT COUNT(1) AS n FROM empresas_bairro WHERE ano = :a"), {'a': ano}).fetchone()
    if row.n and row.n > 0:
        return 0
    sql = text("""
        INSERT INTO empresas_bairro (
            bairro_id, cnae_id, ano, mes,
            empresas_ativas, empresas_abertas, empresas_fechadas,
            empregos_gerados, massa_salarial
        )
        SELECT b.id, c.id, :ano, 1,
               FLOOR(b.populacao_estimada * 0.018),
               FLOOR(b.populacao_estimada * 0.003),
               FLOOR(b.populacao_estimada * 0.002),
               FLOOR(b.populacao_estimada * 0.01),
               (FLOOR(b.populacao_estimada * 0.01) * 2800)::DECIMAL(15,2)
        FROM bairros b
        CROSS JOIN cnae c
        WHERE c.setor IN ('Comércio','Serviços');
    """)
    res = db.session.execute(sql, {'ano': ano})
    db.session.commit()
    return res.rowcount or 0


def seed_pib_multiplos_anos() -> int:
    """Popula PIB para múltiplos anos com dados fake realistas"""
    # Dados base (2021 - valores reais)
    dados_anos = {
        2018: {
            'pib_total': 12243460.0, 'impostos': 1459107.0, 'per_capita': 37733.0,
            'vab_total': 10784353.0, 'agro': 602725.0, 'ind': 1717899.0,
            'serv': 7029606.0, 'adm': 1434122.0
        },
        2019: {
            'pib_total': 13645892.5, 'impostos': 1825410.3, 'per_capita': 41255.8,
            'vab_total': 11820482.2, 'agro': 855320.4, 'ind': 2184633.5,
            'serv': 7498783.1, 'adm': 1281745.2
        },
        2020: {
            'pib_total': 14516210.4, 'impostos': 2019954.7, 'per_capita': 43615.2,
            'vab_total': 12496255.7, 'agro': 1024529.6, 'ind': 2418100.8,
            'serv': 7745370.9, 'adm': 1308254.4
        },
        2021: {
            'pib_total': 15787528.279, 'impostos': 2214717.231, 'per_capita': 46976.49,
            'vab_total': 13572811.048, 'agro': 1206734.268, 'ind': 2651368.272,
            'serv': 8089960.287, 'adm': 1624748.221
        },
        2022: {
            'pib_total': 17365880.5, 'impostos': 2436020.8, 'per_capita': 51274.3,
            'vab_total': 14929859.7, 'agro': 1387407.7, 'ind': 2916505.1,
            'serv': 8899956.3, 'adm': 1725990.6
        },
        2023: {
            'pib_total': 18902345.2, 'impostos': 2646328.3, 'per_capita': 55182.7,
            'vab_total': 16256016.9, 'agro': 1525148.5, 'ind': 3182874.8,
            'serv': 9691952.9, 'adm': 1856040.7
        }
    }
    
    inseridos = 0
    for ano, dados in dados_anos.items():
        row = db.session.execute(
            text("SELECT 1 FROM pib_municipal WHERE ano=:a AND municipio='Cascavel'"), 
            {'a': ano}
        ).fetchone()
        
        if not row:
            insert = text("""
                INSERT INTO pib_municipal (
                    ano, municipio, pib_total_mil, impostos_liquidos_mil, pib_per_capita,
                    vab_total_mil, agropecuaria_mil, industria_mil, servicos_privados_mil, administracao_publica_mil
                ) VALUES (
                    :ano, 'Cascavel', :pib_total, :impostos, :per_capita,
                    :vab_total, :agro, :ind, :serv, :adm
                );
            """)
            db.session.execute(insert, {
                'ano': ano,
                'pib_total': dados['pib_total'],
                'impostos': dados['impostos'],
                'per_capita': dados['per_capita'],
                'vab_total': dados['vab_total'],
                'agro': dados['agro'],
                'ind': dados['ind'],
                'serv': dados['serv'],
                'adm': dados['adm']
            })
            inseridos += 1
    
    db.session.commit()
    return inseridos


def run_demo_seed(ano_indicadores: int = 2023, ano_empresas: int = 2023) -> Dict:
    criados_bairros = seed_bairros_minimo()
    criados_cnae = seed_cnae_minimo()
    criados_indicadores = seed_indicadores_minimo(ano_indicadores)
    criados_empresas = seed_empresas_bairro_minimo(ano_empresas)
    criados_pib = seed_pib_multiplos_anos()
    return {
        'bairros_inseridos': criados_bairros,
        'cnae_inseridos': criados_cnae,
        'indicadores_inseridos': criados_indicadores,
        'empresas_bairro_inseridos': criados_empresas,
        'pib_inseridos': criados_pib
    }


