"""
Modelo: Energia Elétrica
"""
from . import db
from datetime import datetime

class EnergiaEletrica(db.Model):
    __tablename__ = 'energia_eletrica'
    
    id = db.Column(db.Integer, primary_key=True)
    consumo_energia = db.Column(db.Integer)
    consumidores_energia = db.Column(db.Integer)
    ano_referencia = db.Column(db.Integer, index=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'consumo_energia': self.consumo_energia,
            'consumidores_energia': self.consumidores_energia,
            'ano_referencia': self.ano_referencia
        }



