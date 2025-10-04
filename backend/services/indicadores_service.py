"""
Service para gerenciamento de indicadores
"""
from models import (
    db, AreaDemografica, Educacao, Saude,
    DomiciliosSaneamento, EnergiaEletrica, IDHRenda
)
from sqlalchemy import func, desc

class IndicadoresService:
    """Serviço para processar e retornar indicadores"""
    
    def get_kpis_principais(self, ano=None):
        """Retorna os KPIs principais para o dashboard"""
        if ano is None:
            ano = 2022  # Ano mais recente
        
        # Buscar dados do ano especificado
        demografia = AreaDemografica.query.filter_by(ano_referencia=ano).first()
        educacao = Educacao.query.filter_by(ano_referencia=ano).first()
        saude = Saude.query.filter_by(ano_referencia=ano).first()
        domicilios = DomiciliosSaneamento.query.filter_by(ano_referencia=ano).first()
        energia = EnergiaEletrica.query.filter_by(ano_referencia=ano).first()
        idh = IDHRenda.query.filter_by(ano_referencia=ano).first()
        
        # Calcular variações (comparando com ano anterior)
        ano_anterior = ano - 1
        demografia_anterior = AreaDemografica.query.filter_by(ano_referencia=ano_anterior).first()
        
        variacao_populacao = 0
        if demografia and demografia_anterior:
            variacao_populacao = ((demografia.populacao_estimada - demografia_anterior.populacao_estimada) / 
                                demografia_anterior.populacao_estimada * 100)
        
        kpis = {
            'ano_referencia': ano,
            'populacao': {
                'valor': demografia.populacao_estimada if demografia else 0,
                'variacao': round(variacao_populacao, 2),
                'tendencia': 'alta' if variacao_populacao > 0 else 'baixa'
            },
            'idh': {
                'valor': float(idh.idh_municipio) if idh and idh.idh_municipio else 0,
                'comparacao_estado': float(idh.idh_estado) if idh and idh.idh_estado else 0,
                'classificacao': self._classificar_idh(float(idh.idh_municipio) if idh and idh.idh_municipio else 0)
            },
            'educacao': {
                'matriculas_total': educacao.matriculas_educacao_basica if educacao else 0,
                'taxa_analfabetismo': float(educacao.taxa_analfabetismo) if educacao and educacao.taxa_analfabetismo else 0
            },
            'saude': {
                'estabelecimentos': saude.estabelecimentos_saude if saude else 0,
                'leitos': saude.leitos_hospitalares if saude else 0,
                'taxa_mortalidade_infantil': float(saude.taxa_mortalidade_infantil) if saude and saude.taxa_mortalidade_infantil else 0
            },
            'infraestrutura': {
                'cobertura_agua': self._calcular_percentual(
                    domicilios.agua_canalizada if domicilios else 0,
                    domicilios.domicilios_permanentes if domicilios else 1
                ),
                'cobertura_esgoto': self._calcular_percentual(
                    domicilios.unidades_esgoto_atendidas if domicilios else 0,
                    domicilios.domicilios_permanentes if domicilios else 1
                ),
                'coleta_lixo': self._calcular_percentual(
                    domicilios.lixo_coletado if domicilios else 0,
                    domicilios.domicilios_permanentes if domicilios else 1
                )
            },
            'energia': {
                'consumo_mwh': energia.consumo_energia if energia else 0,
                'consumidores': energia.consumidores_energia if energia else 0,
                'consumo_per_capita': round(energia.consumo_energia / demografia.populacao_estimada, 2) 
                    if energia and demografia and demografia.populacao_estimada > 0 else 0
            }
        }
        
        return kpis
    
    def get_serie_temporal(self, indicador):
        """Retorna série temporal de um indicador específico"""
        dados = []
        
        if indicador == 'populacao':
            registros = AreaDemografica.query.order_by(AreaDemografica.ano_referencia).all()
            dados = [{'ano': r.ano_referencia, 'valor': r.populacao_estimada} for r in registros]
        
        elif indicador == 'idh':
            registros = IDHRenda.query.order_by(IDHRenda.ano_referencia).all()
            dados = [{'ano': r.ano_referencia, 'valor': float(r.idh_municipio) if r.idh_municipio else 0} for r in registros]
        
        elif indicador == 'matriculas':
            registros = Educacao.query.order_by(Educacao.ano_referencia).all()
            dados = [{'ano': r.ano_referencia, 'valor': r.matriculas_educacao_basica} for r in registros]
        
        elif indicador == 'mortalidade_infantil':
            registros = Saude.query.order_by(Saude.ano_referencia).all()
            dados = [{'ano': r.ano_referencia, 'valor': float(r.taxa_mortalidade_infantil) if r.taxa_mortalidade_infantil else 0} for r in registros]
        
        return {
            'indicador': indicador,
            'dados': dados
        }
    
    def get_comparativo_anos(self, ano_base, ano_comparacao):
        """Compara indicadores entre dois anos"""
        # Dados do ano base
        demo_base = AreaDemografica.query.filter_by(ano_referencia=ano_base).first()
        edu_base = Educacao.query.filter_by(ano_referencia=ano_base).first()
        saude_base = Saude.query.filter_by(ano_referencia=ano_base).first()
        idh_base = IDHRenda.query.filter_by(ano_referencia=ano_base).first()
        
        # Dados do ano de comparação
        demo_comp = AreaDemografica.query.filter_by(ano_referencia=ano_comparacao).first()
        edu_comp = Educacao.query.filter_by(ano_referencia=ano_comparacao).first()
        saude_comp = Saude.query.filter_by(ano_referencia=ano_comparacao).first()
        idh_comp = IDHRenda.query.filter_by(ano_referencia=ano_comparacao).first()
        
        comparativo = {
            'ano_base': ano_base,
            'ano_comparacao': ano_comparacao,
            'indicadores': []
        }
        
        # População
        if demo_base and demo_comp:
            comparativo['indicadores'].append({
                'nome': 'População',
                'valor_base': demo_base.populacao_estimada,
                'valor_comparacao': demo_comp.populacao_estimada,
                'variacao_absoluta': demo_comp.populacao_estimada - demo_base.populacao_estimada,
                'variacao_percentual': round(((demo_comp.populacao_estimada - demo_base.populacao_estimada) / demo_base.populacao_estimada * 100), 2)
            })
        
        # IDH
        if idh_base and idh_comp:
            comparativo['indicadores'].append({
                'nome': 'IDH',
                'valor_base': float(idh_base.idh_municipio) if idh_base.idh_municipio else 0,
                'valor_comparacao': float(idh_comp.idh_municipio) if idh_comp.idh_municipio else 0,
                'variacao_absoluta': (float(idh_comp.idh_municipio) if idh_comp.idh_municipio else 0) - 
                                    (float(idh_base.idh_municipio) if idh_base.idh_municipio else 0),
                'variacao_percentual': round((((float(idh_comp.idh_municipio) if idh_comp.idh_municipio else 0) - 
                                              (float(idh_base.idh_municipio) if idh_base.idh_municipio else 0)) / 
                                             (float(idh_base.idh_municipio) if idh_base.idh_municipio else 1) * 100), 2)
            })
        
        # Matrículas
        if edu_base and edu_comp:
            comparativo['indicadores'].append({
                'nome': 'Matrículas Educação Básica',
                'valor_base': edu_base.matriculas_educacao_basica,
                'valor_comparacao': edu_comp.matriculas_educacao_basica,
                'variacao_absoluta': edu_comp.matriculas_educacao_basica - edu_base.matriculas_educacao_basica,
                'variacao_percentual': round(((edu_comp.matriculas_educacao_basica - edu_base.matriculas_educacao_basica) / 
                                             edu_base.matriculas_educacao_basica * 100), 2)
            })
        
        # Taxa de Mortalidade Infantil
        if saude_base and saude_comp:
            comparativo['indicadores'].append({
                'nome': 'Taxa Mortalidade Infantil',
                'valor_base': float(saude_base.taxa_mortalidade_infantil) if saude_base.taxa_mortalidade_infantil else 0,
                'valor_comparacao': float(saude_comp.taxa_mortalidade_infantil) if saude_comp.taxa_mortalidade_infantil else 0,
                'variacao_absoluta': (float(saude_comp.taxa_mortalidade_infantil) if saude_comp.taxa_mortalidade_infantil else 0) - 
                                    (float(saude_base.taxa_mortalidade_infantil) if saude_base.taxa_mortalidade_infantil else 0),
                'variacao_percentual': round((((float(saude_comp.taxa_mortalidade_infantil) if saude_comp.taxa_mortalidade_infantil else 0) - 
                                              (float(saude_base.taxa_mortalidade_infantil) if saude_base.taxa_mortalidade_infantil else 0)) / 
                                             (float(saude_base.taxa_mortalidade_infantil) if saude_base.taxa_mortalidade_infantil else 1) * 100), 2)
            })
        
        return comparativo
    
    def _calcular_percentual(self, parte, total):
        """Calcula percentual de forma segura"""
        if total == 0:
            return 0
        return round((parte / total) * 100, 2)
    
    def _classificar_idh(self, valor):
        """Classifica o IDH"""
        if valor >= 0.800:
            return 'Muito Alto'
        elif valor >= 0.700:
            return 'Alto'
        elif valor >= 0.550:
            return 'Médio'
        else:
            return 'Baixo'



