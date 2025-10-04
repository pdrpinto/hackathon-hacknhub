"""
Rotas para predições (mockadas para MVP)
"""
from flask import Blueprint, jsonify, request
from services.predicao_mock import PredicaoMockService

predicoes_bp = Blueprint('predicoes', __name__)
predicao_service = PredicaoMockService()

@predicoes_bp.route('/populacao', methods=['GET'])
def prever_populacao():
    """Retorna previsão mockada de crescimento populacional"""
    try:
        anos_futuro = request.args.get('anos', type=int, default=5)
        previsao = predicao_service.prever_populacao(anos_futuro)
        return jsonify(previsao), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@predicoes_bp.route('/educacao', methods=['GET'])
def prever_educacao():
    """Retorna previsão mockada de indicadores educacionais"""
    try:
        anos_futuro = request.args.get('anos', type=int, default=5)
        previsao = predicao_service.prever_educacao(anos_futuro)
        return jsonify(previsao), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@predicoes_bp.route('/saude', methods=['GET'])
def prever_saude():
    """Retorna previsão mockada de indicadores de saúde"""
    try:
        anos_futuro = request.args.get('anos', type=int, default=5)
        previsao = predicao_service.prever_saude(anos_futuro)
        return jsonify(previsao), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@predicoes_bp.route('/idh', methods=['GET'])
def prever_idh():
    """Retorna previsão mockada de IDH"""
    try:
        anos_futuro = request.args.get('anos', type=int, default=5)
        previsao = predicao_service.prever_idh(anos_futuro)
        return jsonify(previsao), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@predicoes_bp.route('/cenario', methods=['POST'])
def simular_cenario():
    """Simula cenário com base em parâmetros de investimento"""
    try:
        dados = request.get_json()
        resultado = predicao_service.simular_cenario(dados)
        return jsonify(resultado), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500



