from flask import Blueprint, jsonify, request
from sqlalchemy import text
from config import db

indicadores_bp = Blueprint('indicadores_v2', __name__)

@indicadores_bp.route('/indicadores', methods=['GET'])
def get_indicadores():
    """Retorna indicadores com filtros"""
    try:
        # Filtros
        bairro_id = request.args.get('bairro_id', type=int)
        regiao = request.args.get('regiao')
        ano_inicio = request.args.get('ano_inicio', 2020, type=int)
        ano_fim = request.args.get('ano_fim', 2023, type=int)
        cnae_id = request.args.get('cnae_id', type=int)
        
        # Query base
        where_clauses = ["i.ano BETWEEN :ano_inicio AND :ano_fim"]
        params = {'ano_inicio': ano_inicio, 'ano_fim': ano_fim}
        
        if bairro_id:
            where_clauses.append("b.id = :bairro_id")
            params['bairro_id'] = bairro_id
        
        if regiao:
            where_clauses.append("b.regiao = :regiao")
            params['regiao'] = regiao
        
        where_sql = " AND ".join(where_clauses)
        
        query = text(f"""
            SELECT 
                b.id as bairro_id,
                b.nome as bairro_nome,
                b.regiao,
                i.*
            FROM bairros b
            JOIN indicadores_bairro i ON b.id = i.bairro_id
            WHERE {where_sql}
            ORDER BY b.nome, i.ano DESC, i.mes DESC NULLS LAST
        """)
        
        result = db.session.execute(query, params)
        
        indicadores = []
        for row in result:
            indicadores.append({
                'bairro_id': row.bairro_id,
                'bairro_nome': row.bairro_nome,
                'regiao': row.regiao,
                'ano': row.ano,
                'mes': row.mes,
                'populacao': row.populacao,
                'taxa_crescimento': float(row.taxa_crescimento) if row.taxa_crescimento else None,
                'densidade': float(row.densidade) if row.densidade else None,
                'matriculas_total': row.matriculas_total,
                'unidades_saude': row.unidades_saude,
                'empresas_ativas': row.empresas_ativas,
                'empregos_formais': row.empregos_formais,
                'renda_media': float(row.renda_media) if row.renda_media else None,
                'cobertura_agua': float(row.cobertura_agua) if row.cobertura_agua else None,
                'cobertura_esgoto': float(row.cobertura_esgoto) if row.cobertura_esgoto else None
            })
        
        return jsonify({'sucesso': True, 'total': len(indicadores), 'dados': indicadores}), 200
    except Exception as e:
        return jsonify({'sucesso': False, 'erro': str(e)}), 500


@indicadores_bp.route('/indicadores/kpis', methods=['GET'])
def get_kpis():
    """KPIs agregados da cidade"""
    try:
        ano = request.args.get('ano', 2023, type=int)
        
        query = text("""
            SELECT 
                SUM(i.populacao) as populacao_total,
                AVG(i.densidade) as densidade_media,
                AVG(i.taxa_alfabetizacao) as taxa_alfabetizacao_media,
                SUM(i.matriculas_total) as matriculas_total,
                SUM(i.unidades_saude) as unidades_saude_total,
                SUM(i.leitos_disponiveis) as leitos_total,
                AVG(i.cobertura_agua) as cobertura_agua_media,
                AVG(i.cobertura_esgoto) as cobertura_esgoto_media,
                SUM(i.empresas_ativas) as empresas_ativas_total,
                SUM(i.empregos_formais) as empregos_formais_total,
                AVG(i.renda_media) as renda_media,
                AVG(idh.idh_geral) as idh_medio
            FROM indicadores_bairro i
            LEFT JOIN idh_bairro idh ON i.bairro_id = idh.bairro_id AND idh.ano = :ano
            WHERE i.ano = :ano AND i.mes IS NULL
        """)
        
        result = db.session.execute(query, {'ano': ano}).fetchone()
        
        kpis = {
            'ano_referencia': ano,
            'populacao_total': result.populacao_total or 0,
            'densidade_media': float(result.densidade_media) if result.densidade_media else 0,
            'taxa_alfabetizacao_media': float(result.taxa_alfabetizacao_media) if result.taxa_alfabetizacao_media else 0,
            'matriculas_total': result.matriculas_total or 0,
            'unidades_saude_total': result.unidades_saude_total or 0,
            'leitos_total': result.leitos_total or 0,
            'cobertura_agua_media': float(result.cobertura_agua_media) if result.cobertura_agua_media else 0,
            'cobertura_esgoto_media': float(result.cobertura_esgoto_media) if result.cobertura_esgoto_media else 0,
            'empresas_ativas_total': result.empresas_ativas_total or 0,
            'empregos_formais_total': result.empregos_formais_total or 0,
            'renda_media': float(result.renda_media) if result.renda_media else 0,
            'idh_medio': float(result.idh_medio) if result.idh_medio else 0
        }
        
        return jsonify({'sucesso': True, 'dados': kpis}), 200
    except Exception as e:
        return jsonify({'sucesso': False, 'erro': str(e)}), 500


@indicadores_bp.route('/indicadores/serie-temporal/<indicador>', methods=['GET'])
def get_serie_temporal(indicador):
    """Série temporal de um indicador"""
    try:
        bairro_id = request.args.get('bairro_id', type=int)
        ano_inicio = request.args.get('ano_inicio', 2020, type=int)
        ano_fim = request.args.get('ano_fim', 2023, type=int)
        
        # Validar indicador
        indicadores_validos = [
            'populacao', 'densidade', 'renda_media', 'empresas_ativas',
            'empregos_formais', 'cobertura_agua', 'cobertura_esgoto',
            'matriculas_total', 'taxa_alfabetizacao', 'unidades_saude'
        ]
        
        if indicador not in indicadores_validos:
            return jsonify({'sucesso': False, 'erro': 'Indicador inválido'}), 400
        
        where_clauses = ["ano BETWEEN :ano_inicio AND :ano_fim"]
        params = {'ano_inicio': ano_inicio, 'ano_fim': ano_fim}
        
        if bairro_id:
            where_clauses.append("bairro_id = :bairro_id")
            params['bairro_id'] = bairro_id
        
        where_sql = " AND ".join(where_clauses)
        
        query = text(f"""
            SELECT 
                ano,
                bairro_id,
                {indicador} as valor
            FROM indicadores_bairro
            WHERE {where_sql} AND mes IS NULL
            ORDER BY ano
        """)
        
        result = db.session.execute(query, params)
        
        dados = []
        for row in result:
            dados.append({
                'ano': row.ano,
                'bairro_id': row.bairro_id,
                'valor': float(row.valor) if row.valor else 0
            })
        
        return jsonify({'sucesso': True, 'indicador': indicador, 'dados': dados}), 200
    except Exception as e:
        return jsonify({'sucesso': False, 'erro': str(e)}), 500


@indicadores_bp.route('/indicadores/comparacao-regioes', methods=['GET'])
def get_comparacao_regioes():
    """Comparação de indicadores entre regiões"""
    try:
        ano = request.args.get('ano', 2023, type=int)
        
        query = text("""
            SELECT * FROM vw_medias_regiao
            WHERE ano = :ano
            ORDER BY regiao
        """)
        
        result = db.session.execute(query, {'ano': ano})
        
        dados = []
        for row in result:
            dados.append(dict(row._mapping))
        
        return jsonify({'sucesso': True, 'ano': ano, 'dados': dados}), 200
    except Exception as e:
        return jsonify({'sucesso': False, 'erro': str(e)}), 500


@indicadores_bp.route('/indicadores/baseline/<indicador>', methods=['GET'])
def get_baseline(indicador):
    """Retorna baseline (valores normais) de um indicador"""
    try:
        bairro_id = request.args.get('bairro_id', type=int)
        
        where_clauses = ["indicador = :indicador"]
        params = {'indicador': indicador}
        
        if bairro_id:
            where_clauses.append("bairro_id = :bairro_id")
            params['bairro_id'] = bairro_id
        
        where_sql = " AND ".join(where_clauses)
        
        query = text(f"""
            SELECT 
                b.id as bairro_id,
                b.nome as bairro_nome,
                bl.*
            FROM baseline_indicadores bl
            JOIN bairros b ON bl.bairro_id = b.id
            WHERE {where_sql}
            ORDER BY b.nome
        """)
        
        result = db.session.execute(query, params)
        
        baselines = []
        for row in result:
            baselines.append({
                'bairro_id': row.bairro_id,
                'bairro_nome': row.bairro_nome,
                'indicador': row.indicador,
                'valor_medio': float(row.valor_medio) if row.valor_medio else None,
                'desvio_padrao': float(row.desvio_padrao) if row.desvio_padrao else None,
                'minimo': float(row.minimo) if row.minimo else None,
                'maximo': float(row.maximo) if row.maximo else None,
                'ano_referencia': row.ano_referencia
            })
        
        return jsonify({'sucesso': True, 'indicador': indicador, 'dados': baselines}), 200
    except Exception as e:
        return jsonify({'sucesso': False, 'erro': str(e)}), 500

