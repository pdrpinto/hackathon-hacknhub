"""
Modelo: CNAE (Classificação Nacional de Atividades Econômicas)
"""
from . import db
from datetime import datetime

class CNAE(db.Model):
    __tablename__ = 'cnae'
    
    id = db.Column(db.Integer, primary_key=True)
    codigo = db.Column(db.String(20), nullable=False, unique=True, index=True)
    descricao = db.Column(db.String(500), nullable=False)
    setor = db.Column(db.String(100))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'codigo': self.codigo,
            'descricao': self.descricao,
            'setor': self.setor
        }



