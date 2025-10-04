"""
Modelo: Saúde
"""
from . import db
from datetime import datetime

class Saude(db.Model):
    __tablename__ = 'saude'
    
    id = db.Column(db.Integer, primary_key=True)
    estabelecimentos_saude = db.Column(db.Integer)
    leitos_hospitalares = db.Column(db.Integer)
    taxa_fecundidade = db.Column(db.Numeric(5, 2))
    taxa_natalidade = db.Column(db.Numeric(5, 2))
    taxa_mortalidade_geral = db.Column(db.Numeric(5, 2))
    taxa_mortalidade_infantil = db.Column(db.Numeric(5, 2))
    taxa_mortalidade_menores_5 = db.Column(db.Numeric(5, 2))
    taxa_mortalidade_materna = db.Column(db.Numeric(5, 2))
    ano_referencia = db.Column(db.Integer, index=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'estabelecimentos_saude': self.estabelecimentos_saude,
            'leitos_hospitalares': self.leitos_hospitalares,
            'taxa_fecundidade': float(self.taxa_fecundidade) if self.taxa_fecundidade else None,
            'taxa_natalidade': float(self.taxa_natalidade) if self.taxa_natalidade else None,
            'taxa_mortalidade_geral': float(self.taxa_mortalidade_geral) if self.taxa_mortalidade_geral else None,
            'taxa_mortalidade_infantil': float(self.taxa_mortalidade_infantil) if self.taxa_mortalidade_infantil else None,
            'taxa_mortalidade_menores_5': float(self.taxa_mortalidade_menores_5) if self.taxa_mortalidade_menores_5 else None,
            'taxa_mortalidade_materna': float(self.taxa_mortalidade_materna) if self.taxa_mortalidade_materna else None,
            'ano_referencia': self.ano_referencia
        }



