"""
Modelo: Educação
"""
from . import db
from datetime import datetime

class Educacao(db.Model):
    __tablename__ = 'educacao'
    
    id = db.Column(db.Integer, primary_key=True)
    matriculas_educacao_basica = db.Column(db.Integer)
    matriculas_creche = db.Column(db.Integer)
    matriculas_pre_escola = db.Column(db.Integer)
    matriculas_ensino_fundamental = db.Column(db.Integer)
    matriculas_ensino_medio = db.Column(db.Integer)
    matriculas_educacao_profissional = db.Column(db.Integer)
    matriculas_educacao_especial = db.Column(db.Integer)
    matriculas_eja = db.Column(db.Integer)
    matriculas_educacao_superior_presencial = db.Column(db.Integer)
    matriculas_educacao_superior_distancia = db.Column(db.Integer)
    taxa_analfabetismo = db.Column(db.Numeric(5, 2))
    ano_referencia = db.Column(db.Integer, index=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'matriculas_educacao_basica': self.matriculas_educacao_basica,
            'matriculas_creche': self.matriculas_creche,
            'matriculas_pre_escola': self.matriculas_pre_escola,
            'matriculas_ensino_fundamental': self.matriculas_ensino_fundamental,
            'matriculas_ensino_medio': self.matriculas_ensino_medio,
            'matriculas_educacao_profissional': self.matriculas_educacao_profissional,
            'matriculas_educacao_especial': self.matriculas_educacao_especial,
            'matriculas_eja': self.matriculas_eja,
            'matriculas_educacao_superior_presencial': self.matriculas_educacao_superior_presencial,
            'matriculas_educacao_superior_distancia': self.matriculas_educacao_superior_distancia,
            'taxa_analfabetismo': float(self.taxa_analfabetismo) if self.taxa_analfabetismo else None,
            'ano_referencia': self.ano_referencia
        }



