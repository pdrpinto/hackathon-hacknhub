"""
Modelo: IDH e Renda
"""
from . import db
from datetime import datetime

class IDHRenda(db.Model):
    __tablename__ = 'idh_renda'
    
    id = db.Column(db.Integer, primary_key=True)
    idh_municipio = db.Column(db.Numeric(5, 3))
    idh_regiao = db.Column(db.Numeric(5, 3))
    idh_estado = db.Column(db.Numeric(5, 3))
    indice_gini = db.Column(db.Numeric(5, 4))
    ano_referencia = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'idh_municipio': float(self.idh_municipio) if self.idh_municipio else None,
            'idh_regiao': float(self.idh_regiao) if self.idh_regiao else None,
            'idh_estado': float(self.idh_estado) if self.idh_estado else None,
            'indice_gini': float(self.indice_gini) if self.indice_gini else None,
            'ano_referencia': self.ano_referencia
        }



