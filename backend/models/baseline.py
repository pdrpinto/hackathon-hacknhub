from sqlalchemy import Column, Integer, String, DECIMAL, TIMESTAMP, ForeignKey, UniqueConstraint, text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class BaselineIndicador(Base):
    __tablename__ = 'baseline_indicadores'
    
    id = Column(Integer, primary_key=True)
    bairro_id = Column(Integer, ForeignKey('bairros.id', ondelete='CASCADE'), nullable=False)
    indicador = Column(String(50), nullable=False)
    valor_medio = Column(DECIMAL(15, 2))
    desvio_padrao = Column(DECIMAL(15, 2))
    minimo = Column(DECIMAL(15, 2))
    maximo = Column(DECIMAL(15, 2))
    ano_referencia = Column(Integer)
    created_at = Column(TIMESTAMP, server_default=text('CURRENT_TIMESTAMP'))
    
    __table_args__ = (
        UniqueConstraint('bairro_id', 'indicador', 'ano_referencia', name='uq_baseline_bairro_indicador'),
    )
    
    # Relacionamento
    bairro = relationship("Bairro", back_populates="baselines")
    
    def to_dict(self):
        return {
            'id': self.id,
            'bairro_id': self.bairro_id,
            'indicador': self.indicador,
            'valor_medio': float(self.valor_medio) if self.valor_medio else None,
            'desvio_padrao': float(self.desvio_padrao) if self.desvio_padrao else None,
            'minimo': float(self.minimo) if self.minimo else None,
            'maximo': float(self.maximo) if self.maximo else None,
            'ano_referencia': self.ano_referencia
        }


class IDHBairro(Base):
    __tablename__ = 'idh_bairro'
    
    id = Column(Integer, primary_key=True)
    bairro_id = Column(Integer, ForeignKey('bairros.id', ondelete='CASCADE'), nullable=False)
    ano = Column(Integer, nullable=False)
    idh_geral = Column(DECIMAL(5, 3))
    idh_renda = Column(DECIMAL(5, 3))
    idh_educacao = Column(DECIMAL(5, 3))
    idh_longevidade = Column(DECIMAL(5, 3))
    indice_gini = Column(DECIMAL(5, 4))
    created_at = Column(TIMESTAMP, server_default=text('CURRENT_TIMESTAMP'))
    
    __table_args__ = (
        UniqueConstraint('bairro_id', 'ano', name='uq_idh_bairro_ano'),
    )
    
    # Relacionamento
    bairro = relationship("Bairro", back_populates="idhs")
    
    def to_dict(self):
        return {
            'id': self.id,
            'bairro_id': self.bairro_id,
            'ano': self.ano,
            'idh_geral': float(self.idh_geral) if self.idh_geral else None,
            'idh_renda': float(self.idh_renda) if self.idh_renda else None,
            'idh_educacao': float(self.idh_educacao) if self.idh_educacao else None,
            'idh_longevidade': float(self.idh_longevidade) if self.idh_longevidade else None,
            'indice_gini': float(self.indice_gini) if self.indice_gini else None
        }

