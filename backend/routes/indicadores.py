"""
Rotas para gerenciamento de indicadores
"""
from flask import Blueprint, jsonify, request
from models import db, AreaDemografica, Educacao, Saude, DomiciliosSaneamento, EnergiaEletrica, IDHRenda
from services.indicadores_service import IndicadoresService
from services.filtros_service import FiltrosService

indicadores_bp = Blueprint('indicadores', __name__)
indicadores_service = IndicadoresService()
filtros_service = FiltrosService()

@indicadores_bp.route('/kpis', methods=['GET'])
def get_kpis():
    """Retorna os principais KPIs do dashboard"""
    try:
        # Parâmetros de filtro
        ano = request.args.get('ano', type=int)
        
        kpis = indicadores_service.get_kpis_principais(ano)
        return jsonify(kpis), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@indicadores_bp.route('/demografia', methods=['GET'])
def get_demografia():
    """Retorna dados demográficos"""
    try:
        ano_inicio = request.args.get('ano_inicio', type=int)
        ano_fim = request.args.get('ano_fim', type=int)
        
        query = AreaDemografica.query
        
        if ano_inicio:
            query = query.filter(AreaDemografica.ano_referencia >= ano_inicio)
        if ano_fim:
            query = query.filter(AreaDemografica.ano_referencia <= ano_fim)
        
        dados = query.order_by(AreaDemografica.ano_referencia).all()
        return jsonify([d.to_dict() for d in dados]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@indicadores_bp.route('/educacao', methods=['GET'])
def get_educacao():
    """Retorna dados de educação"""
    try:
        ano_inicio = request.args.get('ano_inicio', type=int)
        ano_fim = request.args.get('ano_fim', type=int)
        
        query = Educacao.query
        
        if ano_inicio:
            query = query.filter(Educacao.ano_referencia >= ano_inicio)
        if ano_fim:
            query = query.filter(Educacao.ano_referencia <= ano_fim)
        
        dados = query.order_by(Educacao.ano_referencia).all()
        return jsonify([d.to_dict() for d in dados]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@indicadores_bp.route('/saude', methods=['GET'])
def get_saude():
    """Retorna dados de saúde"""
    try:
        ano_inicio = request.args.get('ano_inicio', type=int)
        ano_fim = request.args.get('ano_fim', type=int)
        
        query = Saude.query
        
        if ano_inicio:
            query = query.filter(Saude.ano_referencia >= ano_inicio)
        if ano_fim:
            query = query.filter(Saude.ano_referencia <= ano_fim)
        
        dados = query.order_by(Saude.ano_referencia).all()
        return jsonify([d.to_dict() for d in dados]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@indicadores_bp.route('/infraestrutura', methods=['GET'])
def get_infraestrutura():
    """Retorna dados de infraestrutura"""
    try:
        ano_inicio = request.args.get('ano_inicio', type=int)
        ano_fim = request.args.get('ano_fim', type=int)
        
        query = DomiciliosSaneamento.query
        
        if ano_inicio:
            query = query.filter(DomiciliosSaneamento.ano_referencia >= ano_inicio)
        if ano_fim:
            query = query.filter(DomiciliosSaneamento.ano_referencia <= ano_fim)
        
        dados = query.order_by(DomiciliosSaneamento.ano_referencia).all()
        return jsonify([d.to_dict() for d in dados]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@indicadores_bp.route('/energia', methods=['GET'])
def get_energia():
    """Retorna dados de energia"""
    try:
        ano_inicio = request.args.get('ano_inicio', type=int)
        ano_fim = request.args.get('ano_fim', type=int)
        
        query = EnergiaEletrica.query
        
        if ano_inicio:
            query = query.filter(EnergiaEletrica.ano_referencia >= ano_inicio)
        if ano_fim:
            query = query.filter(EnergiaEletrica.ano_referencia <= ano_fim)
        
        dados = query.order_by(EnergiaEletrica.ano_referencia).all()
        return jsonify([d.to_dict() for d in dados]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@indicadores_bp.route('/idh', methods=['GET'])
def get_idh():
    """Retorna dados de IDH e renda"""
    try:
        ano_inicio = request.args.get('ano_inicio', type=int)
        ano_fim = request.args.get('ano_fim', type=int)
        
        query = IDHRenda.query
        
        if ano_inicio:
            query = query.filter(IDHRenda.ano_referencia >= ano_inicio)
        if ano_fim:
            query = query.filter(IDHRenda.ano_referencia <= ano_fim)
        
        dados = query.order_by(IDHRenda.ano_referencia).all()
        return jsonify([d.to_dict() for d in dados]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@indicadores_bp.route('/serie-temporal/<indicador>', methods=['GET'])
def get_serie_temporal(indicador):
    """Retorna série temporal de um indicador específico"""
    try:
        dados = indicadores_service.get_serie_temporal(indicador)
        return jsonify(dados), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@indicadores_bp.route('/comparativo', methods=['GET'])
def get_comparativo():
    """Retorna comparativo entre diferentes períodos"""
    try:
        ano_base = request.args.get('ano_base', type=int, default=2018)
        ano_comparacao = request.args.get('ano_comparacao', type=int, default=2022)
        
        comparativo = indicadores_service.get_comparativo_anos(ano_base, ano_comparacao)
        return jsonify(comparativo), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500



