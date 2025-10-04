"""
Modelo: Área Territorial e Demográfica
"""
from . import db
from datetime import datetime

class AreaDemografica(db.Model):
    __tablename__ = 'area_demografica'
    
    id = db.Column(db.Integer, primary_key=True)
    area_territorial_km2 = db.Column(db.Numeric(10, 3))
    densidade_demografica = db.Column(db.Numeric(5, 2))
    grau_urbanizacao = db.Column(db.Numeric(5, 2))
    populacao_estimada = db.Column(db.Integer)
    populacao_censitaria = db.Column(db.Integer)
    populacao_urbana = db.Column(db.Integer)
    populacao_rural = db.Column(db.Integer)
    taxa_crescimento_populacional = db.Column(db.Numeric(5, 2))
    indice_idosos = db.Column(db.Numeric(5, 2))
    razao_dependencia = db.Column(db.Numeric(5, 2))
    razao_sexo = db.Column(db.Numeric(5, 2))
    taxa_envelhecimento = db.Column(db.Numeric(5, 2))
    ano_referencia = db.Column(db.Integer, index=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'area_territorial_km2': float(self.area_territorial_km2) if self.area_territorial_km2 else None,
            'densidade_demografica': float(self.densidade_demografica) if self.densidade_demografica else None,
            'grau_urbanizacao': float(self.grau_urbanizacao) if self.grau_urbanizacao else None,
            'populacao_estimada': self.populacao_estimada,
            'populacao_censitaria': self.populacao_censitaria,
            'populacao_urbana': self.populacao_urbana,
            'populacao_rural': self.populacao_rural,
            'taxa_crescimento_populacional': float(self.taxa_crescimento_populacional) if self.taxa_crescimento_populacional else None,
            'indice_idosos': float(self.indice_idosos) if self.indice_idosos else None,
            'razao_dependencia': float(self.razao_dependencia) if self.razao_dependencia else None,
            'razao_sexo': float(self.razao_sexo) if self.razao_sexo else None,
            'taxa_envelhecimento': float(self.taxa_envelhecimento) if self.taxa_envelhecimento else None,
            'ano_referencia': self.ano_referencia
        }



