from sqlalchemy import Column, Integer, String, DECIMAL, TIMESTAMP, text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base
from datetime import datetime

Base = declarative_base()

class Bairro(Base):
    __tablename__ = 'bairros'
    
    id = Column(Integer, primary_key=True)
    nome = Column(String(100), unique=True, nullable=False)
    regiao = Column(String(50), nullable=False)
    area_km2 = Column(DECIMAL(10, 2))
    populacao_estimada = Column(Integer)
    densidade_demografica = Column(DECIMAL(10, 2))
    renda_media_domiciliar = Column(DECIMAL(10, 2))
    cor_mapa = Column(String(7))
    created_at = Column(TIMESTAMP, server_default=text('CURRENT_TIMESTAMP'))
    
    # Relacionamentos
    indicadores = relationship("IndicadorBairro", back_populates="bairro", cascade="all, delete-orphan")
    empresas = relationship("EmpresaBairro", back_populates="bairro", cascade="all, delete-orphan")
    baselines = relationship("BaselineIndicador", back_populates="bairro", cascade="all, delete-orphan")
    idhs = relationship("IDHBairro", back_populates="bairro", cascade="all, delete-orphan")
    
    def to_dict(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'regiao': self.regiao,
            'area_km2': float(self.area_km2) if self.area_km2 else None,
            'populacao_estimada': self.populacao_estimada,
            'densidade_demografica': float(self.densidade_demografica) if self.densidade_demografica else None,
            'renda_media_domiciliar': float(self.renda_media_domiciliar) if self.renda_media_domiciliar else None,
            'cor_mapa': self.cor_mapa
        }

