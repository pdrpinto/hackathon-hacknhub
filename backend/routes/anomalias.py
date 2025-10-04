"""
Rotas para detecção de anomalias (mockadas para MVP)
"""
from flask import Blueprint, jsonify, request
from services.anomalia_mock import AnomaliaMockService

anomalias_bp = Blueprint('anomalias', __name__)
anomalia_service = AnomaliaMockService()

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



