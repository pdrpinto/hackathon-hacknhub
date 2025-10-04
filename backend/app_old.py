"""
Cascavel em Números - Sistema de Análise e Gestão Pública
Aplicação Flask principal
"""
from flask import Flask, jsonify
from flask_cors import CORS
from config import config
from models import db
import os

def create_app(config_name=None):
    """Factory function para criar a aplicação Flask"""
    if config_name is None:
        config_name = os.getenv('FLASK_ENV', 'development')
    
    app = Flask(__name__)
    app.config.from_object(config[config_name])
    
    # Enable CORS
    CORS(app, resources={r"/api/*": {"origins": "*"}})
    
    # Initialize extensions
    db.init_app(app)
    
    # Register blueprints
    from routes.indicadores import indicadores_bp
    from routes.predicoes import predicoes_bp
    from routes.anomalias import anomalias_bp
    from routes.exportacao import exportacao_bp
    from routes.mapas import mapas_bp
    
    app.register_blueprint(indicadores_bp, url_prefix='/api/indicadores')
    app.register_blueprint(predicoes_bp, url_prefix='/api/predicoes')
    app.register_blueprint(anomalias_bp, url_prefix='/api/anomalias')
    app.register_blueprint(exportacao_bp, url_prefix='/api/exportacao')
    app.register_blueprint(mapas_bp, url_prefix='/api/mapas')
    
    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({
            'status': 'healthy',
            'service': 'Cascavel em Números API',
            'version': '1.0.0'
        })
    
    # Root endpoint
    @app.route('/')
    def index():
        return jsonify({
            'message': 'Bem-vindo à API Cascavel em Números',
            'endpoints': {
                'health': '/api/health',
                'indicadores': '/api/indicadores',
                'predicoes': '/api/predicoes',
                'anomalias': '/api/anomalias',
                'exportacao': '/api/exportacao',
                'mapas': '/api/mapas'
            }
        })
    
    # Error handlers
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'error': 'Endpoint não encontrado'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'error': 'Erro interno do servidor'}), 500
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5000, debug=True)



