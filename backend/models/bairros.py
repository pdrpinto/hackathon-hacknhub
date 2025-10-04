"""
Modelo: Bairros (para visualização em mapas)
"""
from . import db
from datetime import datetime

class Bairro(db.Model):
    __tablename__ = 'bairros'
    
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(255), nullable=False, index=True)
    latitude = db.Column(db.Numeric(10, 7))
    longitude = db.Column(db.Numeric(10, 7))
    populacao_estimada = db.Column(db.Integer)
    area_km2 = db.Column(db.Numeric(10, 3))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'latitude': float(self.latitude) if self.latitude else None,
            'longitude': float(self.longitude) if self.longitude else None,
            'populacao_estimada': self.populacao_estimada,
            'area_km2': float(self.area_km2) if self.area_km2 else None
        }



