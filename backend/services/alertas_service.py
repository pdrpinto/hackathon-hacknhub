"""
Serviço MOCKADO para alertas com validação cruzada de impactos
Retorna alertas sobre anomalias com análise de impactos em outras métricas
"""
from datetime import datetime, timedelta


class AlertasImpactoService:
    """Serviço de alertas com validação cruzada - dados mockados para MVP"""
    
    def get_alertas_com_impactos(self, categoria=None, severidade=None):
        """
        Retorna alertas mockados com análise de impactos cruzados
        
        Args:
            categoria: Filtrar por categoria (economia, saude, educacao, etc)
            severidade: Filtrar por severidade (critico, atencao, informativo)
        
        Returns:
            Dict com lista de alertas e seus impactos esperados
        """
        alertas_mock = [
            {
                'id': 1,
                'tipo': 'anomalia_positiva',
                'categoria': 'economia',
                'metrica_principal': 'cadastro_empresas',
                'titulo': 'Aumento atípico no cadastro de empresas',
                'descricao': 'Detectado crescimento de 45% no cadastro de novas empresas no último trimestre, superando o desvio padrão histórico em 2.3σ',
                'severidade': 'atencao',
                'valor_esperado': 180,
                'valor_detectado': 261,
                'variacao_percentual': 45.0,
                'desvio_padrao': 2.3,
                'periodo': 'Q3 2025',
                'data_deteccao': (datetime.now() - timedelta(days=2)).strftime('%Y-%m-%d'),
                'impactos_esperados': [
                    {
                        'metrica': 'geracao_empregos',
                        'categoria': 'economia',
                        'descricao': 'Aumento esperado na geração de empregos formais',
                        'impacto_estimado': '+15% a +25%',
                        'direcao': 'positivo',
                        'confianca': 'alta',
                        'prazo': '3-6 meses'
                    },
                    {
                        'metrica': 'arrecadacao_iss',
                        'categoria': 'financas',
                        'descricao': 'Incremento na arrecadação de ISS (Imposto Sobre Serviços)',
                        'impacto_estimado': '+12% a +18%',
                        'direcao': 'positivo',
                        'confianca': 'alta',
                        'prazo': '6-12 meses'
                    },
                    {
                        'metrica': 'demanda_infraestrutura',
                        'categoria': 'infraestrutura',
                        'descricao': 'Maior demanda por infraestrutura urbana e serviços públicos',
                        'impacto_estimado': '+10% a +15%',
                        'direcao': 'neutro',
                        'confianca': 'media',
                        'prazo': '12-24 meses'
                    }
                ],
                'acao_recomendada': 'Monitorar setores de crescimento e preparar infraestrutura de apoio',
                'prioridade': 2
            },
            {
                'id': 2,
                'tipo': 'anomalia_negativa',
                'categoria': 'economia',
                'metrica_principal': 'admissoes_comercio',
                'titulo': 'Queda acentuada nas admissões do setor de comércio',
                'descricao': 'Redução de 34% nas admissões do setor de comércio (CNAE 45-47), excedendo 3.1σ do padrão histórico',
                'severidade': 'critico',
                'valor_esperado': 2500,
                'valor_detectado': 1650,
                'variacao_percentual': -34.0,
                'desvio_padrao': 3.1,
                'periodo': 'Setembro 2025',
                'data_deteccao': (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d'),
                'impactos_esperados': [
                    {
                        'metrica': 'taxa_desemprego',
                        'categoria': 'economia',
                        'descricao': 'Possível aumento na taxa de desemprego local',
                        'impacto_estimado': '+2% a +4%',
                        'direcao': 'negativo',
                        'confianca': 'alta',
                        'prazo': '1-3 meses'
                    },
                    {
                        'metrica': 'arrecadacao_icms',
                        'categoria': 'financas',
                        'descricao': 'Redução na arrecadação de ICMS do município',
                        'impacto_estimado': '-8% a -12%',
                        'direcao': 'negativo',
                        'confianca': 'alta',
                        'prazo': '3-6 meses'
                    },
                    {
                        'metrica': 'consumo_familiar',
                        'categoria': 'economia',
                        'descricao': 'Queda no poder de consumo das famílias',
                        'impacto_estimado': '-5% a -10%',
                        'direcao': 'negativo',
                        'confianca': 'media',
                        'prazo': '3-6 meses'
                    },
                    {
                        'metrica': 'programas_sociais',
                        'categoria': 'social',
                        'descricao': 'Aumento na demanda por programas de assistência social',
                        'impacto_estimado': '+15% a +25%',
                        'direcao': 'negativo',
                        'confianca': 'media',
                        'prazo': '3-9 meses'
                    }
                ],
                'acao_recomendada': 'URGENTE: Implementar políticas de estímulo ao comércio e programas de qualificação profissional',
                'prioridade': 1
            },
            {
                'id': 3,
                'tipo': 'anomalia_positiva',
                'categoria': 'saude',
                'metrica_principal': 'cobertura_vacinal',
                'titulo': 'Expansão significativa na cobertura vacinal',
                'descricao': 'Cobertura vacinal aumentou 28% após campanha municipal, superando meta estabelecida em 2.7σ',
                'severidade': 'informativo',
                'valor_esperado': 72.5,
                'valor_detectado': 92.8,
                'variacao_percentual': 28.0,
                'desvio_padrao': 2.7,
                'periodo': 'Agosto-Setembro 2025',
                'data_deteccao': (datetime.now() - timedelta(days=5)).strftime('%Y-%m-%d'),
                'impactos_esperados': [
                    {
                        'metrica': 'internacoes_preveniveis',
                        'categoria': 'saude',
                        'descricao': 'Redução em internações por doenças preveníveis',
                        'impacto_estimado': '-15% a -25%',
                        'direcao': 'positivo',
                        'confianca': 'alta',
                        'prazo': '6-12 meses'
                    },
                    {
                        'metrica': 'gastos_saude_publica',
                        'categoria': 'financas',
                        'descricao': 'Economia nos gastos com saúde pública',
                        'impacto_estimado': 'R$ 800k a R$ 1.2M',
                        'direcao': 'positivo',
                        'confianca': 'media',
                        'prazo': '12-24 meses'
                    },
                    {
                        'metrica': 'produtividade_economica',
                        'categoria': 'economia',
                        'descricao': 'Aumento na produtividade por redução de afastamentos',
                        'impacto_estimado': '+3% a +5%',
                        'direcao': 'positivo',
                        'confianca': 'baixa',
                        'prazo': '12-24 meses'
                    }
                ],
                'acao_recomendada': 'Manter e expandir estratégias da campanha bem-sucedida',
                'prioridade': 3
            },
            {
                'id': 4,
                'tipo': 'anomalia_negativa',
                'categoria': 'educacao',
                'metrica_principal': 'matriculas_ensino_fundamental',
                'titulo': 'Redução no número de matrículas no ensino fundamental',
                'descricao': 'Queda de 8.7% nas matrículas do ensino fundamental, desvio de 1.9σ do padrão esperado',
                'severidade': 'atencao',
                'valor_esperado': 41826,
                'valor_detectado': 38200,
                'variacao_percentual': -8.7,
                'desvio_padrao': 1.9,
                'periodo': 'Ano letivo 2025',
                'data_deteccao': (datetime.now() - timedelta(days=12)).strftime('%Y-%m-%d'),
                'impactos_esperados': [
                    {
                        'metrica': 'evasao_escolar',
                        'categoria': 'educacao',
                        'descricao': 'Possível aumento nas taxas de evasão escolar',
                        'impacto_estimado': '+5% a +10%',
                        'direcao': 'negativo',
                        'confianca': 'alta',
                        'prazo': '3-6 meses'
                    },
                    {
                        'metrica': 'trabalho_infantil',
                        'categoria': 'social',
                        'descricao': 'Risco de aumento do trabalho infantil',
                        'impacto_estimado': '+8% a +15%',
                        'direcao': 'negativo',
                        'confianca': 'media',
                        'prazo': '6-12 meses'
                    },
                    {
                        'metrica': 'ideb_municipal',
                        'categoria': 'educacao',
                        'descricao': 'Impacto negativo no IDEB (Índice de Desenvolvimento da Educação Básica)',
                        'impacto_estimado': '-0.3 a -0.5 pontos',
                        'direcao': 'negativo',
                        'confianca': 'media',
                        'prazo': '24-36 meses'
                    },
                    {
                        'metrica': 'repasse_federal',
                        'categoria': 'financas',
                        'descricao': 'Redução em repasses federais baseados em número de alunos',
                        'impacto_estimado': '-R$ 450k a -R$ 680k',
                        'direcao': 'negativo',
                        'confianca': 'alta',
                        'prazo': '6-12 meses'
                    }
                ],
                'acao_recomendada': 'Investigar causas da queda e implementar programa de busca ativa escolar',
                'prioridade': 2
            },
            {
                'id': 5,
                'tipo': 'anomalia_positiva',
                'categoria': 'infraestrutura',
                'metrica_principal': 'consumo_energia_industrial',
                'titulo': 'Crescimento no consumo energético do setor industrial',
                'descricao': 'Aumento de 32% no consumo de energia do setor industrial, indicando expansão produtiva (2.5σ acima do esperado)',
                'severidade': 'atencao',
                'valor_esperado': 45000,
                'valor_detectado': 59400,
                'variacao_percentual': 32.0,
                'desvio_padrao': 2.5,
                'periodo': 'Q3 2025',
                'data_deteccao': (datetime.now() - timedelta(days=4)).strftime('%Y-%m-%d'),
                'impactos_esperados': [
                    {
                        'metrica': 'empregos_industria',
                        'categoria': 'economia',
                        'descricao': 'Provável aumento na geração de empregos industriais',
                        'impacto_estimado': '+18% a +25%',
                        'direcao': 'positivo',
                        'confianca': 'alta',
                        'prazo': '3-6 meses'
                    },
                    {
                        'metrica': 'capacidade_eletrica',
                        'categoria': 'infraestrutura',
                        'descricao': 'Necessidade de expansão da capacidade da rede elétrica',
                        'impacto_estimado': '+15% a +20%',
                        'direcao': 'neutro',
                        'confianca': 'alta',
                        'prazo': '12-18 meses'
                    },
                    {
                        'metrica': 'pib_municipal',
                        'categoria': 'economia',
                        'descricao': 'Contribuição positiva para o PIB municipal',
                        'impacto_estimado': '+2.5% a +4%',
                        'direcao': 'positivo',
                        'confianca': 'media',
                        'prazo': '12-24 meses'
                    },
                    {
                        'metrica': 'emissoes_co2',
                        'categoria': 'meio_ambiente',
                        'descricao': 'Aumento nas emissões de CO2 (requer monitoramento ambiental)',
                        'impacto_estimado': '+12% a +18%',
                        'direcao': 'negativo',
                        'confianca': 'media',
                        'prazo': '6-12 meses'
                    }
                ],
                'acao_recomendada': 'Planejar expansão de infraestrutura energética e monitorar impactos ambientais',
                'prioridade': 2
            }
        ]
        
        # Aplicar filtros
        alertas_filtrados = alertas_mock
        
        if categoria:
            alertas_filtrados = [a for a in alertas_filtrados if a['categoria'] == categoria]
        
        if severidade:
            alertas_filtrados = [a for a in alertas_filtrados if a['severidade'] == severidade]
        
        return {
            'total': len(alertas_filtrados),
            'filtros_aplicados': {
                'categoria': categoria or 'todas',
                'severidade': severidade or 'todas'
            },
            'alertas': alertas_filtrados,
            'resumo': {
                'criticos': len([a for a in alertas_filtrados if a['severidade'] == 'critico']),
                'atencao': len([a for a in alertas_filtrados if a['severidade'] == 'atencao']),
                'informativos': len([a for a in alertas_filtrados if a['severidade'] == 'informativo']),
                'anomalias_positivas': len([a for a in alertas_filtrados if a['tipo'] == 'anomalia_positiva']),
                'anomalias_negativas': len([a for a in alertas_filtrados if a['tipo'] == 'anomalia_negativa'])
            },
            'gerado_em': datetime.now().isoformat()
        }
    
    def get_alerta_por_id(self, alerta_id):
        """Retorna detalhes de um alerta específico"""
        alertas = self.get_alertas_com_impactos()['alertas']
        alerta = next((a for a in alertas if a['id'] == alerta_id), None)
        
        if not alerta:
            return None
        
        return alerta
    
    def get_categorias_disponiveis(self):
        """Retorna lista de categorias disponíveis"""
        return {
            'categorias': [
                {'id': 'economia', 'nome': 'Economia'},
                {'id': 'saude', 'nome': 'Saúde'},
                {'id': 'educacao', 'nome': 'Educação'},
                {'id': 'infraestrutura', 'nome': 'Infraestrutura'},
                {'id': 'social', 'nome': 'Social'},
                {'id': 'financas', 'nome': 'Finanças'},
                {'id': 'meio_ambiente', 'nome': 'Meio Ambiente'}
            ],
            'severidades': [
                {'id': 'critico', 'nome': 'Crítico', 'cor': '#DC2626'},
                {'id': 'atencao', 'nome': 'Atenção', 'cor': '#F59E0B'},
                {'id': 'informativo', 'nome': 'Informativo', 'cor': '#3B82F6'}
            ]
        }

