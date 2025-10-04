"""
Rotas para dados de mapas
"""
from flask import Blueprint, jsonify, request
from models import Bairro, CNAE
from services.mapas_service import MapasService

mapas_bp = Blueprint('mapas', __name__)
mapas_service = MapasService()

@mapas_bp.route('/bairros', methods=['GET'])
def get_bairros():
    """Retorna todos os bairros com suas coordenadas"""
    try:
        bairros = Bairro.query.all()
        return jsonify([b.to_dict() for b in bairros]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@mapas_bp.route('/bairros/<int:bairro_id>', methods=['GET'])
def get_bairro(bairro_id):
    """Retorna dados de um bairro específico"""
    try:
        bairro = Bairro.query.get_or_404(bairro_id)
        return jsonify(bairro.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@mapas_bp.route('/heatmap', methods=['GET'])
def get_heatmap_data():
    """Retorna dados para heatmap"""
    try:
        indicador = request.args.get('indicador', 'populacao')
        dados = mapas_service.get_heatmap_data(indicador)
        return jsonify(dados), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@mapas_bp.route('/geojson', methods=['GET'])
def get_geojson():
    """Retorna dados em formato GeoJSON para mapas"""
    try:
        geojson = mapas_service.get_geojson_bairros()
        return jsonify(geojson), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@mapas_bp.route('/cnae', methods=['GET'])
def get_cnae():
    """Retorna lista de CNAEs para filtros"""
    try:
        cnaes = CNAE.query.all()
        return jsonify([c.to_dict() for c in cnaes]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@mapas_bp.route('/cnae/setor/<setor>', methods=['GET'])
def get_cnae_por_setor(setor):
    """Retorna CNAEs de um setor específico"""
    try:
        cnaes = CNAE.query.filter_by(setor=setor).all()
        return jsonify([c.to_dict() for c in cnaes]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500



