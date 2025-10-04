"""
Service para dados de mapas
"""
from models import Bairro

class MapasService:
    """Serviço para processar dados geoespaciais"""
    
    def get_heatmap_data(self, indicador='populacao'):
        """Retorna dados para heatmap"""
        bairros = Bairro.query.all()
        
        heatmap_data = []
        for bairro in bairros:
            if bairro.latitude and bairro.longitude:
                valor = bairro.populacao_estimada
                
                if indicador == 'densidade' and bairro.area_km2:
                    valor = bairro.populacao_estimada / float(bairro.area_km2)
                
                heatmap_data.append({
                    'lat': float(bairro.latitude),
                    'lng': float(bairro.longitude),
                    'intensity': valor,
                    'bairro': bairro.nome
                })
        
        return {
            'indicador': indicador,
            'pontos': heatmap_data
        }
    
    def get_geojson_bairros(self):
        """Retorna dados dos bairros em formato GeoJSON"""
        bairros = Bairro.query.all()
        
        features = []
        for bairro in bairros:
            if bairro.latitude and bairro.longitude:
                features.append({
                    'type': 'Feature',
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [float(bairro.longitude), float(bairro.latitude)]
                    },
                    'properties': {
                        'id': bairro.id,
                        'nome': bairro.nome,
                        'populacao': bairro.populacao_estimada,
                        'area_km2': float(bairro.area_km2) if bairro.area_km2 else None,
                        'densidade': round(bairro.populacao_estimada / float(bairro.area_km2), 2) 
                            if bairro.area_km2 and float(bairro.area_km2) > 0 else None
                    }
                })
        
        geojson = {
            'type': 'FeatureCollection',
            'features': features
        }
        
        return geojson
    
    def get_bairro_detalhado(self, bairro_id):
        """Retorna dados detalhados de um bairro"""
        bairro = Bairro.query.get(bairro_id)
        
        if not bairro:
            return None
        
        detalhes = bairro.to_dict()
        
        # Adicionar estatísticas calculadas
        if bairro.area_km2 and float(bairro.area_km2) > 0:
            detalhes['densidade_demografica'] = round(
                bairro.populacao_estimada / float(bairro.area_km2), 2
            )
        
        return detalhes



