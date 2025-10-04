from flask import Blueprint, jsonify, request, Response
from sqlalchemy import text
from config import db
import csv
import io
from services.ingest_caged import ingest_caged_mock
from services.ingest_empresas import pipeline_completo, gerar_empresas_mock, agregar_para_empresas_bairro
from services.demo_seed import run_demo_seed


economia_bp = Blueprint('economia', __name__)


def _apply_common_filters(where_clauses, params):
    bairro_id = request.args.get('bairro_id', type=int)
    regiao = request.args.get('regiao', type=str)
    cnae_id = request.args.get('cnae_id', type=int)

    if bairro_id:
        where_clauses.append('eb.bairro_id = :bairro_id')
        params['bairro_id'] = bairro_id
    if regiao:
        where_clauses.append('b.regiao = :regiao')
        params['regiao'] = regiao
    if cnae_id:
        where_clauses.append('eb.cnae_id = :cnae_id')
        params['cnae_id'] = cnae_id

    return where_clauses, params


@economia_bp.route('/economia/pib', methods=['GET'])
def get_pib_municipal():
    try:
        ano = request.args.get('ano', type=int) or 2021
        query = text("""
            SELECT ano,
                   municipio,
                   pib_total_mil,
                   impostos_liquidos_mil,
                   pib_per_capita,
                   vab_total_mil,
                   agropecuaria_mil,
                   industria_mil,
                   servicos_privados_mil,
                   administracao_publica_mil
            FROM pib_municipal
            WHERE ano = :ano AND municipio = 'Cascavel'
        """)
        row = db.session.execute(query, {'ano': ano}).fetchone()
        if not row:
            return jsonify({'sucesso': True, 'dados': None, 'mensagem': 'PIB não encontrado para o ano informado'}), 200

        dados = {
            'ano': row.ano,
            'municipio': row.municipio,
            'pib_total_mil': float(row.pib_total_mil) if row.pib_total_mil is not None else None,
            'impostos_liquidos_mil': float(row.impostos_liquidos_mil) if row.impostos_liquidos_mil is not None else None,
            'pib_per_capita': float(row.pib_per_capita) if row.pib_per_capita is not None else None,
            'vab_total_mil': float(row.vab_total_mil) if row.vab_total_mil is not None else None,
            'agropecuaria_mil': float(row.agropecuaria_mil) if row.agropecuaria_mil is not None else None,
            'industria_mil': float(row.industria_mil) if row.industria_mil is not None else None,
            'servicos_privados_mil': float(row.servicos_privados_mil) if row.servicos_privados_mil is not None else None,
            'administracao_publica_mil': float(row.administracao_publica_mil) if row.administracao_publica_mil is not None else None,
        }
        return jsonify({'sucesso': True, 'dados': dados}), 200
    except Exception as e:
        return jsonify({'sucesso': False, 'erro': str(e)}), 500


@economia_bp.route('/economia/kpis', methods=['GET'])
def get_kpis_economia():
    try:
        ano = request.args.get('ano', type=int) or 2023
        where = ['eb.ano = :ano']
        params = {'ano': ano}
        where, params = _apply_common_filters(where, params)
        where_sql = ' AND '.join(where)

        query = text(f"""
            SELECT
                COALESCE(SUM(eb.empresas_ativas), 0) as empresas_ativas_total,
                COALESCE(SUM(eb.empresas_abertas), 0) as empresas_abertas_total,
                COALESCE(SUM(eb.empresas_fechadas), 0) as empresas_fechadas_total,
                COALESCE(SUM(eb.empregos_gerados), 0) as empregos_gerados_total,
                COALESCE(SUM(eb.massa_salarial), 0) as massa_salarial_total
            FROM empresas_bairro eb
            JOIN bairros b ON b.id = eb.bairro_id
            WHERE {where_sql}
        """)
        row = db.session.execute(query, params).fetchone()

        empresas_abertas_total = int(row.empresas_abertas_total or 0)
        empresas_fechadas_total = int(row.empresas_fechadas_total or 0)
        empregos_gerados_total = int(row.empregos_gerados_total or 0)
        massa_salarial_total = float(row.massa_salarial_total or 0)

        kpis = {
            'ano': ano,
            'empresas_ativas_total': int(row.empresas_ativas_total or 0),
            'empresas_abertas_total': empresas_abertas_total,
            'empresas_fechadas_total': empresas_fechadas_total,
            'saldo_empresas': empresas_abertas_total - empresas_fechadas_total,
            'empregos_gerados_total': empregos_gerados_total,
            'massa_salarial_total': massa_salarial_total,
            'ticket_medio_salarial': round(massa_salarial_total / empregos_gerados_total, 2) if empregos_gerados_total else 0.0
        }
        return jsonify({'sucesso': True, 'dados': kpis}), 200
    except Exception as e:
        return jsonify({'sucesso': False, 'erro': str(e)}), 500


@economia_bp.route('/economia/serie', methods=['GET'])
def get_serie_economia():
    try:
        indicador = request.args.get('indicador', default='empresas_abertas', type=str)
        ano_inicio = request.args.get('ano_inicio', type=int) or 2020
        ano_fim = request.args.get('ano_fim', type=int) or 2023

        valid = {
            'empresas_abertas': 'empresas_abertas',
            'empresas_fechadas': 'empresas_fechadas',
            'empresas_ativas': 'empresas_ativas',
            'empregos_gerados': 'empregos_gerados',
            'massa_salarial': 'massa_salarial'
        }
        if indicador not in valid:
            return jsonify({'sucesso': False, 'erro': 'Indicador inválido'}), 400

        where = ['eb.ano BETWEEN :ano_inicio AND :ano_fim']
        params = {'ano_inicio': ano_inicio, 'ano_fim': ano_fim}
        where, params = _apply_common_filters(where, params)
        where_sql = ' AND '.join(where)

        query = text(f"""
            SELECT eb.ano, COALESCE(SUM(eb.{valid[indicador]}), 0) as valor
            FROM empresas_bairro eb
            JOIN bairros b ON b.id = eb.bairro_id
            WHERE {where_sql}
            GROUP BY eb.ano
            ORDER BY eb.ano
        """)
        rows = db.session.execute(query, params).fetchall()
        dados = [{'ano': r.ano, 'valor': float(r.valor)} for r in rows]
        return jsonify({'sucesso': True, 'indicador': indicador, 'dados': dados}), 200
    except Exception as e:
        return jsonify({'sucesso': False, 'erro': str(e)}), 500


@economia_bp.route('/economia/cnae/top', methods=['GET'])
def get_top_cnae():
    try:
        ano = request.args.get('ano', type=int) or 2023
        metric = request.args.get('metric', default='empresas_ativas', type=str)
        limit = request.args.get('limit', type=int) or 10

        valid = {'empresas_ativas', 'empregos_gerados', 'empresas_abertas'}
        if metric not in valid:
            return jsonify({'sucesso': False, 'erro': 'Métrica inválida'}), 400

        where = ['eb.ano = :ano']
        params = {'ano': ano}
        where, params = _apply_common_filters(where, params)
        where_sql = ' AND '.join(where)

        query = text(f"""
            SELECT c.id as cnae_id, c.codigo, c.descricao, c.setor,
                   COALESCE(SUM(eb.{metric}), 0) as valor
            FROM empresas_bairro eb
            JOIN cnae c ON c.id = eb.cnae_id
            JOIN bairros b ON b.id = eb.bairro_id
            WHERE {where_sql}
            GROUP BY c.id, c.codigo, c.descricao, c.setor
            ORDER BY valor DESC
            LIMIT :limit
        """)
        params['limit'] = limit
        rows = db.session.execute(query, params).fetchall()
        dados = [
            {
                'cnae_id': r.cnae_id,
                'codigo': r.codigo,
                'descricao': r.descricao,
                'setor': r.setor,
                'valor': float(r.valor)
            } for r in rows
        ]
        return jsonify({'sucesso': True, 'ano': ano, 'metric': metric, 'dados': dados}), 200
    except Exception as e:
        return jsonify({'sucesso': False, 'erro': str(e)}), 500


@economia_bp.route('/economia/ingest/caged', methods=['POST'])
def post_ingest_caged():
    try:
        ano_inicio = request.json.get('ano_inicio', 2019)
        ano_fim = request.json.get('ano_fim', 2023)
        res = ingest_caged_mock(ano_inicio=ano_inicio, ano_fim=ano_fim)
        status = 200 if res.get('ok') else 400
        return jsonify(res), status
    except Exception as e:
        return jsonify({'ok': False, 'erro': str(e)}), 500


@economia_bp.route('/economia/ingest/empresas', methods=['POST'])
def post_ingest_empresas():
    """
    Gera cadastro mock de empresas com CNPJ → Endereço → Bairro
    e agrega para empresas_bairro.
    
    Body JSON (opcional):
    {
        "total_empresas": 1000,
        "ano_inicio_empresas": 2015,
        "ano_fim_empresas": 2023,
        "ano_inicio_agregacao": 2019,
        "ano_fim_agregacao": 2023
    }
    """
    try:
        body = request.get_json() or {}
        res = pipeline_completo(
            total_empresas=body.get('total_empresas', 1000),
            ano_inicio_empresas=body.get('ano_inicio_empresas', 2015),
            ano_fim_empresas=body.get('ano_fim_empresas', 2023),
            ano_inicio_agregacao=body.get('ano_inicio_agregacao', 2019),
            ano_fim_agregacao=body.get('ano_fim_agregacao', 2023)
        )
        status = 200 if res.get('ok') else 400
        return jsonify(res), status
    except Exception as e:
        return jsonify({'ok': False, 'erro': str(e)}), 500


@economia_bp.route('/economia/seed-demo', methods=['POST'])
def post_seed_demo():
    """
    Popula banco com dados de demonstração (bairros, CNAE, indicadores, empresas, PIB).
    Insere apenas se tabelas estiverem vazias ou registros não existirem.
    """
    try:
        body = request.get_json() or {}
        ano_indicadores = body.get('ano_indicadores', 2023)
        ano_empresas = body.get('ano_empresas', 2023)
        res = run_demo_seed(ano_indicadores=ano_indicadores, ano_empresas=ano_empresas)
        return jsonify({'ok': True, 'dados': res}), 200
    except Exception as e:
        return jsonify({'ok': False, 'erro': str(e)}), 500

@economia_bp.route('/economia/empresas/cadastro', methods=['GET'])
def get_empresas_cadastro():
    """
    Lista empresas do cadastro individual com filtros.
    Query params: bairro_id, cnae_id, situacao, limit, offset
    """
    try:
        bairro_id = request.args.get('bairro_id', type=int)
        cnae_id = request.args.get('cnae_id', type=int)
        situacao = request.args.get('situacao', type=str)
        limit = min(request.args.get('limit', type=int, default=50), 500)
        offset = request.args.get('offset', type=int, default=0)
        
        where = []
        params = {'limit': limit, 'offset': offset}
        
        if bairro_id:
            where.append('ec.bairro_id = :bairro_id')
            params['bairro_id'] = bairro_id
        if cnae_id:
            where.append('ec.cnae_id = :cnae_id')
            params['cnae_id'] = cnae_id
        if situacao:
            where.append('ec.situacao_cadastral = :situacao')
            params['situacao'] = situacao.upper()
        
        where_sql = 'WHERE ' + ' AND '.join(where) if where else ''
        
        query = text(f"""
            SELECT 
                ec.id, ec.cnpj, ec.razao_social, ec.nome_fantasia,
                ec.cnae_codigo, ec.cnae_descricao,
                b.nome as bairro, b.regiao,
                ec.logradouro, ec.numero, ec.complemento, ec.cep,
                ec.data_abertura, ec.situacao_cadastral, ec.porte,
                ec.capital_social
            FROM empresas_cadastro ec
            JOIN bairros b ON b.id = ec.bairro_id
            {where_sql}
            ORDER BY ec.razao_social
            LIMIT :limit OFFSET :offset
        """)
        
        rows = db.session.execute(query, params).fetchall()
        
        # Total count
        count_query = text(f"""
            SELECT COUNT(*) as total
            FROM empresas_cadastro ec
            {where_sql}
        """)
        total = db.session.execute(count_query, {k: v for k, v in params.items() if k not in ['limit', 'offset']}).fetchone().total
        
        dados = [
            {
                'id': r.id,
                'cnpj': r.cnpj,
                'razao_social': r.razao_social,
                'nome_fantasia': r.nome_fantasia,
                'cnae_codigo': r.cnae_codigo,
                'cnae_descricao': r.cnae_descricao,
                'bairro': r.bairro,
                'regiao': r.regiao,
                'endereco': {
                    'logradouro': r.logradouro,
                    'numero': r.numero,
                    'complemento': r.complemento,
                    'cep': r.cep
                },
                'data_abertura': r.data_abertura.isoformat() if r.data_abertura else None,
                'situacao_cadastral': r.situacao_cadastral,
                'porte': r.porte,
                'capital_social': float(r.capital_social) if r.capital_social else None
            } for r in rows
        ]
        
        return jsonify({
            'sucesso': True,
            'total': total,
            'limit': limit,
            'offset': offset,
            'dados': dados
        }), 200
    except Exception as e:
        return jsonify({'sucesso': False, 'erro': str(e)}), 500


@economia_bp.route('/economia/export/csv', methods=['GET'])
def export_csv_economia():
    try:
        ano = request.args.get('ano', type=int) or 2023
        where = ['eb.ano = :ano']
        params = {'ano': ano}
        where, params = _apply_common_filters(where, params)
        where_sql = ' AND '.join(where)

        query = text(f"""
            SELECT 
                eb.ano,
                b.id as bairro_id, b.nome as bairro, b.regiao,
                c.id as cnae_id, c.codigo as cnae_codigo, c.descricao as cnae_descricao, c.setor,
                MAX(eb.empresas_ativas) as empresas_ativas,
                SUM(eb.empresas_abertas) as empresas_abertas,
                SUM(eb.empresas_fechadas) as empresas_fechadas,
                SUM(eb.empregos_gerados) as empregos_gerados,
                SUM(eb.massa_salarial) as massa_salarial
            FROM empresas_bairro eb
            JOIN bairros b ON b.id = eb.bairro_id
            JOIN cnae c ON c.id = eb.cnae_id
            WHERE {where_sql}
            GROUP BY eb.ano, b.id, b.nome, b.regiao, c.id, c.codigo, c.descricao, c.setor
            ORDER BY eb.ano, b.nome, c.codigo
        """)
        rows = db.session.execute(query, params).fetchall()

        output = io.StringIO()
        writer = csv.writer(output, delimiter=';')
        writer.writerow(['ano', 'bairro_id', 'bairro', 'regiao', 'cnae_id', 'cnae_codigo', 'cnae_descricao', 'setor', 'empresas_ativas', 'empresas_abertas', 'empresas_fechadas', 'empregos_gerados', 'massa_salarial'])
        for r in rows:
            writer.writerow([
                r.ano, r.bairro_id, r.bairro, r.regiao, r.cnae_id, r.cnae_codigo, r.cnae_descricao, r.setor,
                int(r.empresas_ativas or 0), 
                int(r.empresas_abertas or 0), 
                int(r.empresas_fechadas or 0), 
                int(r.empregos_gerados or 0), 
                float(r.massa_salarial) if r.massa_salarial is not None else 0.0
            ])
        csv_data = output.getvalue()
        return Response(csv_data, mimetype='text/csv', headers={'Content-Disposition': f'attachment; filename="economia_{ano}.csv"'})
    except Exception as e:
        return jsonify({'sucesso': False, 'erro': str(e)}), 500
