"""
Modelo: Domicílios e Saneamento
"""
from . import db
from datetime import datetime

class DomiciliosSaneamento(db.Model):
    __tablename__ = 'domicilios_saneamento'
    
    id = db.Column(db.Integer, primary_key=True)
    domicilios_recenseados = db.Column(db.Integer)
    domicilios_permanentes = db.Column(db.Integer)
    agua_canalizada = db.Column(db.Integer)
    banheiro_sanitario = db.Column(db.Integer)
    lixo_coletado = db.Column(db.Integer)
    energia_eletrica = db.Column(db.Integer)
    unidades_agua_atendidas = db.Column(db.Integer)
    volume_agua_faturado = db.Column(db.Integer)
    volume_agua_medido = db.Column(db.Integer)
    unidades_esgoto_atendidas = db.Column(db.Integer)
    ano_referencia = db.Column(db.Integer, index=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    def to_dict(self):
        return {
            'id': self.id,
            'domicilios_recenseados': self.domicilios_recenseados,
            'domicilios_permanentes': self.domicilios_permanentes,
            'agua_canalizada': self.agua_canalizada,
            'banheiro_sanitario': self.banheiro_sanitario,
            'lixo_coletado': self.lixo_coletado,
            'energia_eletrica': self.energia_eletrica,
            'unidades_agua_atendidas': self.unidades_agua_atendidas,
            'volume_agua_faturado': self.volume_agua_faturado,
            'volume_agua_medido': self.volume_agua_medido,
            'unidades_esgoto_atendidas': self.unidades_esgoto_atendidas,
            'ano_referencia': self.ano_referencia
        }



