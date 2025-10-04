"""
Rotas para detecção de anomalias (mockadas para MVP)
"""
from flask import Blueprint, jsonify, request
from services.anomalia_mock import AnomaliaMockService
from services.alertas_service import AlertasImpactoService

anomalias_bp = Blueprint('anomalias', __name__)
anomalia_service = AnomaliaMockService()
alertas_service = AlertasImpactoService()

@anomalias_bp.route('/detectar', methods=['GET'])
def detectar_anomalias():
    """Retorna anomalias mockadas detectadas nos dados"""
    try:
        area = request.args.get('area', 'todas')  # saude, educacao, demografia, etc
        severidade = request.args.get('severidade', 'todas')  # alta, media, baixa
        
        anomalias = anomalia_service.detectar_anomalias(area, severidade)
        return jsonify(anomalias), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@anomalias_bp.route('/alertas', methods=['GET'])
def get_alertas():
    """Retorna alertas ativos mockados"""
    try:
        alertas = anomalia_service.get_alertas_ativos()
        return jsonify(alertas), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@anomalias_bp.route('/historico', methods=['GET'])
def get_historico_anomalias():
    """Retorna histórico de anomalias mockadas"""
    try:
        limite = request.args.get('limite', type=int, default=50)
        historico = anomalia_service.get_historico(limite)
        return jsonify(historico), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@anomalias_bp.route('/dashboard', methods=['GET'])
def get_dashboard_anomalias():
    """Retorna dashboard resumido de anomalias"""
    try:
        dashboard = anomalia_service.get_dashboard_anomalias()
        return jsonify(dashboard), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@anomalias_bp.route('/alertas-impactos', methods=['GET'])
def get_alertas_impactos():
    """
    Retorna alertas com análise de impactos cruzados
    
    Query params:
    - categoria: Filtrar por categoria (economia, saude, educacao, etc)
    - severidade: Filtrar por severidade (critico, atencao, informativo)
    """
    try:
        categoria = request.args.get('categoria', None)
        severidade = request.args.get('severidade', None)
        
        alertas = alertas_service.get_alertas_com_impactos(categoria, severidade)
        return jsonify(alertas), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@anomalias_bp.route('/alertas-impactos/<int:alerta_id>', methods=['GET'])
def get_alerta_impacto_detalhes(alerta_id):
    """Retorna detalhes de um alerta específico com impactos"""
    try:
        alerta = alertas_service.get_alerta_por_id(alerta_id)
        if not alerta:
            return jsonify({'error': 'Alerta não encontrado'}), 404
        return jsonify(alerta), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@anomalias_bp.route('/categorias', methods=['GET'])
def get_categorias():
    """Retorna categorias e severidades disponíveis para filtros"""
    try:
        categorias = alertas_service.get_categorias_disponiveis()
        return jsonify(categorias), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500



