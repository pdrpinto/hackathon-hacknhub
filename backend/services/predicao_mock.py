"""
Service MOCKADO para predições (MVP)
Retorna dados simulados para demonstração
"""
import random
from datetime import datetime

class PredicaoMockService:
    """Serviço mockado de predições - será substituído por ML real futuramente"""
    
    def prever_populacao(self, anos_futuro=5):
        """Retorna previsão mockada de crescimento populacional"""
        ano_atual = 2022
        populacao_atual = 332333
        taxa_crescimento = 1.55  # percentual anual
        
        previsoes = []
        for i in range(1, anos_futuro + 1):
            ano = ano_atual + i
            # Simula variação aleatória pequena
            variacao = random.uniform(-0.2, 0.2)
            taxa_ajustada = taxa_crescimento + variacao
            
            populacao_prevista = int(populacao_atual * (1 + taxa_ajustada/100) ** i)
            
            previsoes.append({
                'ano': ano,
                'valor_previsto': populacao_prevista,
                'limite_inferior': int(populacao_prevista * 0.95),
                'limite_superior': int(populacao_prevista * 1.05),
                'confianca': round(random.uniform(0.85, 0.95), 2)
            })
        
        return {
            'indicador': 'populacao',
            'metodo': 'Regressão Linear (Mockado)',
            'ano_base': ano_atual,
            'valor_base': populacao_atual,
            'previsoes': previsoes
        }
    
    def prever_educacao(self, anos_futuro=5):
        """Retorna previsão mockada de indicadores educacionais"""
        ano_atual = 2022
        matriculas_atual = 75443
        
        previsoes = []
        for i in range(1, anos_futuro + 1):
            ano = ano_atual + i
            # Simulação de leve crescimento
            crescimento = random.uniform(0.5, 1.5)
            matriculas_previstas = int(matriculas_atual * (1 + crescimento/100) ** i)
            
            previsoes.append({
                'ano': ano,
                'matriculas_previstas': matriculas_previstas,
                'taxa_analfabetismo_prevista': round(4.46 - (i * 0.1), 2),  # Melhora gradual
                'confianca': round(random.uniform(0.80, 0.92), 2)
            })
        
        return {
            'indicador': 'educacao',
            'metodo': 'Prophet (Mockado)',
            'ano_base': ano_atual,
            'previsoes': previsoes
        }
    
    def prever_saude(self, anos_futuro=5):
        """Retorna previsão mockada de indicadores de saúde"""
        ano_atual = 2022
        
        previsoes = []
        for i in range(1, anos_futuro + 1):
            ano = ano_atual + i
            
            # Simula melhora nos indicadores de saúde
            previsoes.append({
                'ano': ano,
                'taxa_mortalidade_infantil': round(9.79 - (i * 0.4), 2),
                'leitos_necessarios': 949 + (i * 15),
                'estabelecimentos_necessarios': 744 + (i * 10),
                'confianca': round(random.uniform(0.78, 0.90), 2)
            })
        
        return {
            'indicador': 'saude',
            'metodo': 'XGBoost (Mockado)',
            'ano_base': ano_atual,
            'previsoes': previsoes
        }
    
    def prever_idh(self, anos_futuro=5):
        """Retorna previsão mockada de IDH"""
        ano_atual = 2022
        idh_atual = 0.792
        
        previsoes = []
        for i in range(1, anos_futuro + 1):
            ano = ano_atual + i
            
            # IDH cresce lentamente
            crescimento = random.uniform(0.002, 0.005)
            idh_previsto = round(idh_atual + (i * crescimento), 3)
            
            previsoes.append({
                'ano': ano,
                'idh_previsto': idh_previsto,
                'classificacao': self._classificar_idh(idh_previsto),
                'confianca': round(random.uniform(0.82, 0.93), 2)
            })
        
        return {
            'indicador': 'idh',
            'metodo': 'Série Temporal (Mockado)',
            'ano_base': ano_atual,
            'valor_base': idh_atual,
            'previsoes': previsoes
        }
    
    def simular_cenario(self, parametros):
        """Simula cenário com base em investimentos"""
        area = parametros.get('area', 'educacao')
        investimento_percentual = parametros.get('investimento_percentual', 10)
        anos = parametros.get('anos', 3)
        
        # Simula impacto do investimento
        impacto_base = investimento_percentual * 0.5  # Cada 1% de investimento = 0.5% de melhora
        
        cenarios = {
            'otimista': {
                'descricao': 'Cenário com máxima eficiência do investimento',
                'impacto_percentual': round(impacto_base * 1.5, 2),
                'probabilidade': 0.25
            },
            'realista': {
                'descricao': 'Cenário com eficiência média esperada',
                'impacto_percentual': round(impacto_base, 2),
                'probabilidade': 0.50
            },
            'pessimista': {
                'descricao': 'Cenário com baixa eficiência do investimento',
                'impacto_percentual': round(impacto_base * 0.6, 2),
                'probabilidade': 0.25
            }
        }
        
        return {
            'area': area,
            'investimento_percentual': investimento_percentual,
            'periodo_anos': anos,
            'cenarios': cenarios,
            'recomendacao': f'Investimento de {investimento_percentual}% em {area} pode resultar em melhora de {impacto_base:.1f}% nos indicadores relacionados.',
            'gerado_em': datetime.now().isoformat()
        }
    
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



