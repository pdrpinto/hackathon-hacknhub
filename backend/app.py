from flask import Flask, jsonify
from flask_cors import CORS
from config import db
import os

# Importar as novas rotas focadas em bairros
from routes.bairros import bairros_bp
from routes.indicadores_v2 import indicadores_bp
from routes.economia import economia_bp

app = Flask(__name__)
CORS(app)

# Configuração do banco de dados
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
    'DATABASE_URL',
    'postgresql://cascavel_user:cascavel_pass@localhost:5432/cascavel_db'
)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Inicializar SQLAlchemy
db.init_app(app)

# Registrar Blueprints
app.register_blueprint(bairros_bp, url_prefix='/api')
app.register_blueprint(indicadores_bp, url_prefix='/api')
app.register_blueprint(economia_bp, url_prefix='/api')

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        # Testar conexão com o banco
        from sqlalchemy import text
        db.session.execute(text('SELECT 1'))
        return jsonify({
            'status': 'healthy',
            'database': 'connected',
            'message': 'Sistema Cascavel em Números - API v2 focada em bairros'
        }), 200
    except Exception as e:
        return jsonify({
            'status': 'unhealthy',
            'database': 'disconnected',
            'error': str(e)
        }), 500

@app.route('/api/info', methods=['GET'])
def info():
    """Informações sobre a API"""
    return jsonify({
        'nome': 'Cascavel em Números - API v2',
        'versao': '2.0.0',
        'descricao': 'Sistema de análise e gestão pública focado em bairros',
        'endpoints': {
            'bairros': {
                'GET /api/bairros': 'Lista todos os bairros',
                'GET /api/bairros/<id>': 'Detalhes de um bairro',
                'GET /api/bairros/regiao/<regiao>': 'Bairros por região',
                'GET /api/bairros/mapa/geojson': 'GeoJSON para mapas'
            },
            'indicadores': {
                'GET /api/indicadores': 'Indicadores com filtros',
                'GET /api/indicadores/kpis': 'KPIs agregados',
                'GET /api/indicadores/serie-temporal/<indicador>': 'Série temporal',
                'GET /api/indicadores/comparacao-regioes': 'Comparação entre regiões',
                'GET /api/indicadores/baseline/<indicador>': 'Valores normais (baseline)'
            }
        },
        'filtros_disponiveis': {
            'bairro_id': 'ID do bairro',
            'regiao': 'Norte, Sul, Leste, Oeste, Centro',
            'ano_inicio': 'Ano inicial (padrão: 2020)',
            'ano_fim': 'Ano final (padrão: 2023)',
            'cnae_id': 'ID da CNAE'
        }
    }), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

