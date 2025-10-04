"""
Configurações da aplicação Flask
"""
import os
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy

load_dotenv()

# Instância do SQLAlchemy
db = SQLAlchemy()

class Config:
    """Configuração base"""
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key-change-in-production')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL', 'postgresql://cascavel_user:cascavel_pass@localhost:5432/cascavel_db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = False
    
    # CORS
    CORS_HEADERS = 'Content-Type'
    
    # Pagination
    ITEMS_PER_PAGE = 50
    MAX_ITEMS_PER_PAGE = 100
    
    # Export paths
    EXPORT_FOLDER = os.path.join(os.path.dirname(__file__), 'exports')
    os.makedirs(EXPORT_FOLDER, exist_ok=True)

class DevelopmentConfig(Config):
    """Configuração de desenvolvimento"""
    DEBUG = True
    SQLALCHEMY_ECHO = True

class ProductionConfig(Config):
    """Configuração de produção"""
    DEBUG = False
    SQLALCHEMY_ECHO = False

# Mapeamento de configurações
config = {
    'development': DevelopmentConfig,
    'production': ProductionConfig,
    'default': DevelopmentConfig
}


