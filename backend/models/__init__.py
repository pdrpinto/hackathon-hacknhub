"""
Modelos de dados do sistema
"""
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Import all models
from .territorio import TerritorioAutoridade
from .eleitores import Eleitores
from .demografia import AreaDemografica
from .idh import IDHRenda
from .educacao import Educacao
from .saude import Saude
from .domicilios import DomiciliosSaneamento
from .energia import EnergiaEletrica
from .bairros import Bairro
from .cnae import CNAE

__all__ = [
    'db',
    'TerritorioAutoridade',
    'Eleitores',
    'AreaDemografica',
    'IDHRenda',
    'Educacao',
    'Saude',
    'DomiciliosSaneamento',
    'EnergiaEletrica',
    'Bairro',
    'CNAE'
]


