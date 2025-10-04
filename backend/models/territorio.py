"""
Modelo: Território e Autoridade Eleita
"""
from . import db
from datetime import datetime

class TerritorioAutoridade(db.Model):
    __tablename__ = 'territorio_autoridade'
    
    id = db.Column(db.Integer, primary_key=True)
    regiao_geografica_imediata = db.Column(db.String(255), nullable=False)
    data_instalacao = db.Column(db.Date)
    data_comemoracao = db.Column(db.String(255))
    altitude_sede_m = db.Column(db.Integer)
    distancia_capital_km = db.Column(db.Numeric(5, 2))
    autoridade_eleita = db.Column(db.String(255))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'regiao_geografica_imediata': self.regiao_geografica_imediata,
            'data_instalacao': self.data_instalacao.isoformat() if self.data_instalacao else None,
            'data_comemoracao': self.data_comemoracao,
            'altitude_sede_m': self.altitude_sede_m,
            'distancia_capital_km': float(self.distancia_capital_km) if self.distancia_capital_km else None,
            'autoridade_eleita': self.autoridade_eleita
        }


