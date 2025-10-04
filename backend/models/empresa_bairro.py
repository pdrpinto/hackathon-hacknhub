from sqlalchemy import Column, Integer, DECIMAL, TIMESTAMP, ForeignKey, UniqueConstraint, text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class CNAE(Base):
    __tablename__ = 'cnae'
    
    id = Column(Integer, primary_key=True)
    codigo = Column(String(10), unique=True, nullable=False)
    descricao = Column(String(200), nullable=False)
    setor = Column(String(50), nullable=False)
    
    # Relacionamento
    empresas = relationship("EmpresaBairro", back_populates="cnae")
    
    def to_dict(self):
        return {
            'id': self.id,
            'codigo': self.codigo,
            'descricao': self.descricao,
            'setor': self.setor
        }


class EmpresaBairro(Base):
    __tablename__ = 'empresas_bairro'
    
    id = Column(Integer, primary_key=True)
    bairro_id = Column(Integer, ForeignKey('bairros.id', ondelete='CASCADE'), nullable=False)
    cnae_id = Column(Integer, ForeignKey('cnae.id', ondelete='CASCADE'), nullable=False)
    ano = Column(Integer, nullable=False)
    mes = Column(Integer, nullable=True)
    
    empresas_ativas = Column(Integer)
    empresas_abertas = Column(Integer)
    empresas_fechadas = Column(Integer)
    empregos_gerados = Column(Integer)
    massa_salarial = Column(DECIMAL(15, 2))
    
    created_at = Column(TIMESTAMP, server_default=text('CURRENT_TIMESTAMP'))
    
    __table_args__ = (
        UniqueConstraint('bairro_id', 'cnae_id', 'ano', 'mes', name='uq_empresa_bairro_periodo'),
    )
    
    # Relacionamentos
    bairro = relationship("Bairro", back_populates="empresas")
    cnae = relationship("CNAE", back_populates="empresas")
    
    def to_dict(self):
        return {
            'id': self.id,
            'bairro_id': self.bairro_id,
            'cnae_id': self.cnae_id,
            'ano': self.ano,
            'mes': self.mes,
            'empresas_ativas': self.empresas_ativas,
            'empresas_abertas': self.empresas_abertas,
            'empresas_fechadas': self.empresas_fechadas,
            'empregos_gerados': self.empregos_gerados,
            'massa_salarial': float(self.massa_salarial) if self.massa_salarial else None
        }

