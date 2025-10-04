from sqlalchemy import Column, Integer, DECIMAL, TIMESTAMP, ForeignKey, UniqueConstraint, text
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class IndicadorBairro(Base):
    __tablename__ = 'indicadores_bairro'
    
    id = Column(Integer, primary_key=True)
    bairro_id = Column(Integer, ForeignKey('bairros.id', ondelete='CASCADE'), nullable=False)
    ano = Column(Integer, nullable=False)
    mes = Column(Integer, nullable=True)
    
    # Demografia
    populacao = Column(Integer)
    taxa_crescimento = Column(DECIMAL(5, 2))
    densidade = Column(DECIMAL(10, 2))
    
    # Educação
    matriculas_total = Column(Integer)
    matriculas_fundamental = Column(Integer)
    matriculas_medio = Column(Integer)
    escolas_municipais = Column(Integer)
    escolas_estaduais = Column(Integer)
    taxa_alfabetizacao = Column(DECIMAL(5, 2))
    
    # Saúde
    unidades_saude = Column(Integer)
    leitos_disponiveis = Column(Integer)
    atendimentos_mes = Column(Integer)
    taxa_mortalidade_infantil = Column(DECIMAL(5, 2))
    
    # Infraestrutura
    domicilios_total = Column(Integer)
    cobertura_agua = Column(DECIMAL(5, 2))
    cobertura_esgoto = Column(DECIMAL(5, 2))
    coleta_lixo = Column(DECIMAL(5, 2))
    iluminacao_publica = Column(DECIMAL(5, 2))
    
    # Energia
    consumo_energia_kwh = Column(Integer)
    consumidores_energia = Column(Integer)
    
    # Economia
    empresas_ativas = Column(Integer)
    empregos_formais = Column(Integer)
    renda_media = Column(DECIMAL(10, 2))
    
    created_at = Column(TIMESTAMP, server_default=text('CURRENT_TIMESTAMP'))
    
    __table_args__ = (
        UniqueConstraint('bairro_id', 'ano', 'mes', name='uq_indicador_bairro_periodo'),
    )
    
    # Relacionamento
    bairro = relationship("Bairro", back_populates="indicadores")
    
    def to_dict(self):
        return {
            'id': self.id,
            'bairro_id': self.bairro_id,
            'ano': self.ano,
            'mes': self.mes,
            'populacao': self.populacao,
            'taxa_crescimento': float(self.taxa_crescimento) if self.taxa_crescimento else None,
            'densidade': float(self.densidade) if self.densidade else None,
            'matriculas_total': self.matriculas_total,
            'matriculas_fundamental': self.matriculas_fundamental,
            'matriculas_medio': self.matriculas_medio,
            'escolas_municipais': self.escolas_municipais,
            'escolas_estaduais': self.escolas_estaduais,
            'taxa_alfabetizacao': float(self.taxa_alfabetizacao) if self.taxa_alfabetizacao else None,
            'unidades_saude': self.unidades_saude,
            'leitos_disponiveis': self.leitos_disponiveis,
            'atendimentos_mes': self.atendimentos_mes,
            'taxa_mortalidade_infantil': float(self.taxa_mortalidade_infantil) if self.taxa_mortalidade_infantil else None,
            'domicilios_total': self.domicilios_total,
            'cobertura_agua': float(self.cobertura_agua) if self.cobertura_agua else None,
            'cobertura_esgoto': float(self.cobertura_esgoto) if self.cobertura_esgoto else None,
            'coleta_lixo': float(self.coleta_lixo) if self.coleta_lixo else None,
            'iluminacao_publica': float(self.iluminacao_publica) if self.iluminacao_publica else None,
            'consumo_energia_kwh': self.consumo_energia_kwh,
            'consumidores_energia': self.consumidores_energia,
            'empresas_ativas': self.empresas_ativas,
            'empregos_formais': self.empregos_formais,
            'renda_media': float(self.renda_media) if self.renda_media else None
        }

