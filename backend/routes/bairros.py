from flask import Blueprint, jsonify, request
from sqlalchemy import text
from config import db

bairros_bp = Blueprint('bairros', __name__)

@bairros_bp.route('/bairros', methods=['GET'])
def get_bairros():
    """Lista todos os bairros"""
    try:
        query = text("""
            SELECT 
                b.id, b.nome, b.regiao, b.area_km2, 
                b.populacao_estimada, b.densidade_demografica,
                b.renda_media_domiciliar, b.cor_mapa, b.loteamentos,
                ST_AsGeoJSON(b.coordenadas_centro::geometry) as centro_geojson,
                ST_AsGeoJSON(b.poligono) as poligono_geojson
            FROM bairros b
            ORDER BY b.nome
        """)
        result = db.session.execute(query)
        
        bairros = []
        for row in result:
            bairros.append({
                'id': row.id,
                'nome': row.nome,
                'regiao': row.regiao,
                'area_km2': float(row.area_km2) if row.area_km2 else None,
                'populacao_estimada': row.populacao_estimada,
                'densidade_demografica': float(row.densidade_demografica) if row.densidade_demografica else None,
                'renda_media_domiciliar': float(row.renda_media_domiciliar) if row.renda_media_domiciliar else None,
                'cor_mapa': row.cor_mapa,
                'centro': row.centro_geojson,
                'poligono': row.poligono_geojson,
                'loteamentos': getattr(row, 'loteamentos', None)
            })
        
        return jsonify({'sucesso': True, 'dados': bairros}), 200
    except Exception as e:
        return jsonify({'sucesso': False, 'erro': str(e)}), 500


@bairros_bp.route('/bairros/<int:bairro_id>', methods=['GET'])
def get_bairro(bairro_id):
    """Detalhes de um bairro específico"""
    try:
        query = text("""
            SELECT 
                b.*,
                ST_AsGeoJSON(b.coordenadas_centro::geometry) as centro_geojson,
                ST_AsGeoJSON(b.poligono) as poligono_geojson,
                i.ano, i.populacao, i.densidade, i.renda_media,
                i.empresas_ativas, i.empregos_formais,
                i.cobertura_agua, i.cobertura_esgoto,
                idh.idh_geral
            FROM bairros b
            LEFT JOIN LATERAL (
                SELECT * FROM indicadores_bairro 
                WHERE bairro_id = b.id 
                ORDER BY ano DESC, mes DESC NULLS LAST
                LIMIT 1
            ) i ON true
            LEFT JOIN LATERAL (
                SELECT * FROM idh_bairro
                WHERE bairro_id = b.id
                ORDER BY ano DESC
                LIMIT 1
            ) idh ON true
            WHERE b.id = :bairro_id
        """)
        result = db.session.execute(query, {'bairro_id': bairro_id}).fetchone()
        
        if not result:
            return jsonify({'sucesso': False, 'erro': 'Bairro não encontrado'}), 404
        
        bairro = {
            'id': result.id,
            'nome': result.nome,
            'regiao': result.regiao,
            'area_km2': float(result.area_km2) if result.area_km2 else None,
            'populacao_estimada': result.populacao_estimada,
            'densidade_demografica': float(result.densidade_demografica) if result.densidade_demografica else None,
            'renda_media_domiciliar': float(result.renda_media_domiciliar) if result.renda_media_domiciliar else None,
            'cor_mapa': result.cor_mapa,
            'centro': result.centro_geojson,
            'poligono': result.poligono_geojson,
            'indicadores_recentes': {
                'ano': result.ano,
                'populacao': result.populacao,
                'densidade': float(result.densidade) if result.densidade else None,
                'renda_media': float(result.renda_media) if result.renda_media else None,
                'empresas_ativas': result.empresas_ativas,
                'empregos_formais': result.empregos_formais,
                'cobertura_agua': float(result.cobertura_agua) if result.cobertura_agua else None,
                'cobertura_esgoto': float(result.cobertura_esgoto) if result.cobertura_esgoto else None,
                'idh_geral': float(result.idh_geral) if result.idh_geral else None
            }
        }
        
        return jsonify({'sucesso': True, 'dados': bairro}), 200
    except Exception as e:
        return jsonify({'sucesso': False, 'erro': str(e)}), 500


@bairros_bp.route('/bairros/regiao/<regiao>', methods=['GET'])
def get_bairros_por_regiao(regiao):
    """Lista bairros por região"""
    try:
        query = text("""
            SELECT * FROM vw_resumo_bairros
            WHERE regiao = :regiao
            ORDER BY nome
        """)
        result = db.session.execute(query, {'regiao': regiao})
        
        bairros = [dict(row._mapping) for row in result]
        
        return jsonify({'sucesso': True, 'regiao': regiao, 'dados': bairros}), 200
    except Exception as e:
        return jsonify({'sucesso': False, 'erro': str(e)}), 500


@bairros_bp.route('/bairros/mapa/geojson', methods=['GET'])
def get_mapa_geojson():
    """Retorna GeoJSON de todos os bairros para o mapa"""
    try:
        query = text("""
            SELECT 
                b.id, b.nome, b.regiao, b.cor_mapa,
                b.populacao_estimada, b.renda_media_domiciliar,
                ST_AsGeoJSON(b.poligono) as geom,
                i.populacao, i.empresas_ativas, i.renda_media
            FROM bairros b
            LEFT JOIN LATERAL (
                SELECT * FROM indicadores_bairro 
                WHERE bairro_id = b.id 
                ORDER BY ano DESC 
                LIMIT 1
            ) i ON true
        """)
        result = db.session.execute(query)
        
        features = []
        for row in result:
            features.append({
                'type': 'Feature',
                'properties': {
                    'id': row.id,
                    'nome': row.nome,
                    'regiao': row.regiao,
                    'cor': row.cor_mapa,
                    'populacao': row.populacao or row.populacao_estimada,
                    'empresas_ativas': row.empresas_ativas,
                    'renda_media': float(row.renda_media) if row.renda_media else None
                },
                'geometry': row.geom
            })
        
        geojson = {
            'type': 'FeatureCollection',
            'features': features
        }
        
        return jsonify(geojson), 200
    except Exception as e:
        return jsonify({'erro': str(e)}), 500

