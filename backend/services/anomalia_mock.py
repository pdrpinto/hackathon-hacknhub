"""
Service MOCKADO para detecção de anomalias (MVP)
Retorna dados simulados para demonstração
"""
import random
from datetime import datetime, timedelta

class AnomaliaMockService:
    """Serviço mockado de detecção de anomalias - será substituído por ML real futuramente"""
    
    def detectar_anomalias(self, area='todas', severidade='todas'):
        """Retorna anomalias mockadas detectadas"""
        anomalias_mock = [
            {
                'id': 1,
                'area': 'saude',
                'indicador': 'Taxa de Mortalidade Infantil',
                'tipo': 'aumento_brusco',
                'severidade': 'alta',
                'valor_esperado': 9.79,
                'valor_detectado': 12.5,
                'desvio_percentual': 27.7,
                'data_deteccao': (datetime.now() - timedelta(days=2)).isoformat(),
                'descricao': 'Aumento anormal na taxa de mortalidade infantil detectado no último trimestre'
            },
            {
                'id': 2,
                'area': 'educacao',
                'indicador': 'Matrículas Ensino Fundamental',
                'tipo': 'queda_brusca',
                'severidade': 'media',
                'valor_esperado': 41826,
                'valor_detectado': 38200,
                'desvio_percentual': -8.7,
                'data_deteccao': (datetime.now() - timedelta(days=5)).isoformat(),
                'descricao': 'Queda significativa no número de matrículas comparado ao mesmo período do ano anterior'
            },
            {
                'id': 3,
                'area': 'infraestrutura',
                'indicador': 'Consumo de Água',
                'tipo': 'anomalia_padrao',
                'severidade': 'baixa',
                'valor_esperado': 16007361,
                'valor_detectado': 17500000,
                'desvio_percentual': 9.3,
                'data_deteccao': (datetime.now() - timedelta(days=1)).isoformat(),
                'descricao': 'Padrão de consumo atípico detectado em alguns bairros'
            },
            {
                'id': 4,
                'area': 'economia',
                'indicador': 'Admissões por CNAE 45-47',
                'tipo': 'queda_brusca',
                'severidade': 'alta',
                'valor_esperado': 2500,
                'valor_detectado': 1650,
                'desvio_percentual': -34.0,
                'data_deteccao': (datetime.now() - timedelta(days=7)).isoformat(),
                'descricao': 'Queda brusca de admissões no setor de comércio (CNAE 45-47)'
            },
            {
                'id': 5,
                'area': 'demografia',
                'indicador': 'Taxa de Crescimento Populacional',
                'tipo': 'tendencia_inesperada',
                'severidade': 'media',
                'valor_esperado': 1.55,
                'valor_detectado': 2.1,
                'desvio_percentual': 35.5,
                'data_deteccao': (datetime.now() - timedelta(days=3)).isoformat(),
                'descricao': 'Taxa de crescimento acima do esperado pode indicar migração elevada'
            }
        ]
        
        # Filtrar por área
        if area != 'todas':
            anomalias_mock = [a for a in anomalias_mock if a['area'] == area]
        
        # Filtrar por severidade
        if severidade != 'todas':
            anomalias_mock = [a for a in anomalias_mock if a['severidade'] == severidade]
        
        return {
            'total': len(anomalias_mock),
            'filtros': {
                'area': area,
                'severidade': severidade
            },
            'anomalias': anomalias_mock
        }
    
    def get_alertas_ativos(self):
        """Retorna alertas ativos mockados"""
        alertas = [
            {
                'id': 1,
                'titulo': 'Aumento na Mortalidade Infantil',
                'area': 'saude',
                'severidade': 'alta',
                'status': 'ativo',
                'criado_em': (datetime.now() - timedelta(days=2)).isoformat(),
                'acao_recomendada': 'Investigar causas e implementar medidas preventivas imediatas'
            },
            {
                'id': 2,
                'titulo': 'Queda em Admissões - Comércio',
                'area': 'economia',
                'severidade': 'alta',
                'status': 'ativo',
                'criado_em': (datetime.now() - timedelta(days=7)).isoformat(),
                'acao_recomendada': 'Analisar situação econômica do setor e considerar políticas de estímulo'
            },
            {
                'id': 3,
                'titulo': 'Queda em Matrículas',
                'area': 'educacao',
                'severidade': 'media',
                'status': 'ativo',
                'criado_em': (datetime.now() - timedelta(days=5)).isoformat(),
                'acao_recomendada': 'Investigar causas da evasão escolar'
            }
        ]
        
        return {
            'total_ativos': len(alertas),
            'alertas': alertas
        }
    
    def get_historico(self, limite=50):
        """Retorna histórico de anomalias mockadas"""
        # Simula histórico
        historico = []
        for i in range(min(limite, 20)):  # Limita a 20 registros mockados
            historico.append({
                'id': i + 10,
                'area': random.choice(['saude', 'educacao', 'infraestrutura', 'economia']),
                'indicador': f'Indicador Mock {i + 1}',
                'severidade': random.choice(['alta', 'media', 'baixa']),
                'data_deteccao': (datetime.now() - timedelta(days=random.randint(10, 60))).isoformat(),
                'status': random.choice(['resolvido', 'em_analise', 'arquivado']),
                'tempo_resolucao_dias': random.randint(1, 30)
            })
        
        return {
            'total': len(historico),
            'historico': historico
        }
    
    def get_dashboard_anomalias(self):
        """Retorna dashboard resumido de anomalias"""
        return {
            'resumo': {
                'total_anomalias_mes': random.randint(8, 15),
                'alertas_ativos': 3,
                'anomalias_resolvidas': random.randint(15, 25),
                'taxa_resolucao': round(random.uniform(0.75, 0.92), 2)
            },
            'por_severidade': {
                'alta': random.randint(2, 4),
                'media': random.randint(3, 6),
                'baixa': random.randint(2, 5)
            },
            'por_area': {
                'saude': random.randint(1, 3),
                'educacao': random.randint(1, 3),
                'infraestrutura': random.randint(0, 2),
                'economia': random.randint(1, 4),
                'demografia': random.randint(0, 2)
            },
            'tendencia_mensal': [
                {'mes': 'Jan', 'anomalias': 8},
                {'mes': 'Fev', 'anomalias': 12},
                {'mes': 'Mar', 'anomalias': 10},
                {'mes': 'Abr', 'anomalias': 15},
                {'mes': 'Mai', 'anomalias': 11},
                {'mes': 'Jun', 'anomalias': 9}
            ],
            'atualizado_em': datetime.now().isoformat()
        }



