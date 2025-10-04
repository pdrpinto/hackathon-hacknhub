"""
Modelo: Eleitores e Zonas Eleitorais
"""
from . import db
from datetime import datetime

class Eleitores(db.Model):
    __tablename__ = 'eleitores'
    
    id = db.Column(db.Integer, primary_key=True)
    numero_eleitores_municipio = db.Column(db.Integer)
    numero_eleitores_regiao = db.Column(db.Integer)
    numero_eleitores_estado = db.Column(db.Integer)
    quantidade_zonas_eleitorais_municipio = db.Column(db.Integer)
    quantidade_zonas_eleitorais_regiao = db.Column(db.Integer)
    quantidade_zonas_eleitorais_estado = db.Column(db.Integer)
    ano_referencia = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'numero_eleitores_municipio': self.numero_eleitores_municipio,
            'numero_eleitores_regiao': self.numero_eleitores_regiao,
            'numero_eleitores_estado': self.numero_eleitores_estado,
            'quantidade_zonas_eleitorais_municipio': self.quantidade_zonas_eleitorais_municipio,
            'quantidade_zonas_eleitorais_regiao': self.quantidade_zonas_eleitorais_regiao,
            'quantidade_zonas_eleitorais_estado': self.quantidade_zonas_eleitorais_estado,
            'ano_referencia': self.ano_referencia
        }



