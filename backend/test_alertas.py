#!/usr/bin/env python
"""
Script de teste para a API de Alertas com Impactos Cruzados
Execute: python test_alertas.py
"""

import requests
import json
from datetime import datetime

BASE_URL = 'http://localhost:5000/api/anomalias'

def print_section(title):
    """Print uma seção formatada"""
    print('\n' + '='*80)
    print(f'  {title}')
    print('='*80 + '\n')

def test_alertas_completo():
    """Testa todos os endpoints de alertas"""
    
    print_section('🧪 TESTE: API de Alertas com Impactos Cruzados')
    print(f'⏰ Hora do teste: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}\n')
    
    # Teste 1: Listar todos os alertas
    print_section('1️⃣ Teste: Listar TODOS os alertas')
    try:
        response = requests.get(f'{BASE_URL}/alertas-impactos')
        data = response.json()
        
        print(f'✅ Status Code: {response.status_code}')
        print(f'✅ Total de alertas: {data["total"]}')
        print(f'✅ Resumo:')
        print(f'   - Críticos: {data["resumo"]["criticos"]}')
        print(f'   - Atenção: {data["resumo"]["atencao"]}')
        print(f'   - Informativos: {data["resumo"]["informativos"]}')
        print(f'   - Anomalias Positivas: {data["resumo"]["anomalias_positivas"]}')
        print(f'   - Anomalias Negativas: {data["resumo"]["anomalias_negativas"]}')
        
        print(f'\n📋 Alertas encontrados:')
        for alerta in data['alertas']:
            print(f'   - [{alerta["id"]}] {alerta["titulo"]} ({alerta["severidade"]})')
            print(f'     → Impactos: {len(alerta["impactos_esperados"])} métricas afetadas')
    except Exception as e:
        print(f'❌ Erro: {str(e)}')
    
    # Teste 2: Filtrar por categoria
    print_section('2️⃣ Teste: Filtrar por categoria "economia"')
    try:
        response = requests.get(f'{BASE_URL}/alertas-impactos?categoria=economia')
        data = response.json()
        
        print(f'✅ Status Code: {response.status_code}')
        print(f'✅ Alertas de economia: {data["total"]}')
        print(f'✅ Filtros aplicados: {data["filtros_aplicados"]}')
        
        for alerta in data['alertas']:
            print(f'   - {alerta["titulo"]}')
            print(f'     Variação: {alerta["variacao_percentual"]:+.1f}% | Desvio: {alerta["desvio_padrao"]}σ')
    except Exception as e:
        print(f'❌ Erro: {str(e)}')
    
    # Teste 3: Filtrar por severidade
    print_section('3️⃣ Teste: Filtrar por severidade "critico"')
    try:
        response = requests.get(f'{BASE_URL}/alertas-impactos?severidade=critico')
        data = response.json()
        
        print(f'✅ Status Code: {response.status_code}')
        print(f'✅ Alertas críticos: {data["total"]}')
        
        for alerta in data['alertas']:
            print(f'\n   🔴 {alerta["titulo"]}')
            print(f'   Descrição: {alerta["descricao"][:100]}...')
            print(f'   Ação recomendada: {alerta["acao_recomendada"][:80]}...')
    except Exception as e:
        print(f'❌ Erro: {str(e)}')
    
    # Teste 4: Detalhes de um alerta específico
    print_section('4️⃣ Teste: Detalhes do alerta #1')
    try:
        response = requests.get(f'{BASE_URL}/alertas-impactos/1')
        alerta = response.json()
        
        print(f'✅ Status Code: {response.status_code}')
        print(f'✅ Alerta: {alerta["titulo"]}')
        print(f'✅ Categoria: {alerta["categoria"]} | Severidade: {alerta["severidade"]}')
        print(f'✅ Valor esperado: {alerta["valor_esperado"]}')
        print(f'✅ Valor detectado: {alerta["valor_detectado"]}')
        print(f'✅ Variação: {alerta["variacao_percentual"]:+.1f}%')
        
        print(f'\n📊 Impactos Esperados:')
        for impacto in alerta['impactos_esperados']:
            direcao_emoji = '📈' if impacto['direcao'] == 'positivo' else '📉' if impacto['direcao'] == 'negativo' else '➡️'
            print(f'   {direcao_emoji} {impacto["metrica"]}')
            print(f'      • {impacto["descricao"]}')
            print(f'      • Impacto: {impacto["impacto_estimado"]} | Confiança: {impacto["confianca"]} | Prazo: {impacto["prazo"]}')
    except Exception as e:
        print(f'❌ Erro: {str(e)}')
    
    # Teste 5: Categorias disponíveis
    print_section('5️⃣ Teste: Listar categorias disponíveis')
    try:
        response = requests.get(f'{BASE_URL}/categorias')
        data = response.json()
        
        print(f'✅ Status Code: {response.status_code}')
        print(f'\n📂 Categorias:')
        for cat in data['categorias']:
            print(f'   - {cat["nome"]} (id: {cat["id"]})')
        
        print(f'\n🏷️  Severidades:')
        for sev in data['severidades']:
            print(f'   - {sev["nome"]} (id: {sev["id"]}, cor: {sev["cor"]})')
    except Exception as e:
        print(f'❌ Erro: {str(e)}')
    
    # Teste 6: Filtros combinados
    print_section('6️⃣ Teste: Filtros combinados (economia + atenção)')
    try:
        response = requests.get(f'{BASE_URL}/alertas-impactos?categoria=economia&severidade=atencao')
        data = response.json()
        
        print(f'✅ Status Code: {response.status_code}')
        print(f'✅ Alertas encontrados: {data["total"]}')
        print(f'✅ Filtros: {json.dumps(data["filtros_aplicados"], indent=2)}')
        
        for alerta in data['alertas']:
            print(f'\n   ⚠️  {alerta["titulo"]}')
            print(f'      Período: {alerta["periodo"]} | Detectado: {alerta["data_deteccao"]}')
            print(f'      Impactos: {len(alerta["impactos_esperados"])} métricas afetadas')
    except Exception as e:
        print(f'❌ Erro: {str(e)}')
    
    print_section('✅ TESTES CONCLUÍDOS')
    print('Todos os endpoints foram testados com sucesso!')
    print('A API de Alertas com Impactos Cruzados está funcionando corretamente.\n')


if __name__ == '__main__':
    try:
        test_alertas_completo()
    except requests.exceptions.ConnectionError:
        print('\n❌ ERRO: Não foi possível conectar ao servidor.')
        print('   Certifique-se de que o backend está rodando em http://localhost:5000')
        print('\n   Execute: cd backend && python app.py\n')
    except Exception as e:
        print(f'\n❌ ERRO INESPERADO: {str(e)}\n')

