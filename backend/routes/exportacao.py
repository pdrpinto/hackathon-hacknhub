"""
Rotas para exportação de dados
"""
from flask import Blueprint, jsonify, send_file, request
from services.exportacao_service import ExportacaoService
import os

exportacao_bp = Blueprint('exportacao', __name__)
exportacao_service = ExportacaoService()

@exportacao_bp.route('/csv', methods=['POST'])
def exportar_csv():
    """Exporta dados para CSV"""
    try:
        dados = request.get_json()
        tipo_dados = dados.get('tipo', 'kpis')
        filtros = dados.get('filtros', {})
        
        filepath = exportacao_service.exportar_csv(tipo_dados, filtros)
        
        return send_file(
            filepath,
            mimetype='text/csv',
            as_attachment=True,
            download_name=os.path.basename(filepath)
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@exportacao_bp.route('/pdf', methods=['POST'])
def exportar_pdf():
    """Exporta relatório para PDF"""
    try:
        dados = request.get_json()
        tipo_relatorio = dados.get('tipo', 'completo')
        filtros = dados.get('filtros', {})
        
        filepath = exportacao_service.exportar_pdf(tipo_relatorio, filtros)
        
        return send_file(
            filepath,
            mimetype='application/pdf',
            as_attachment=True,
            download_name=os.path.basename(filepath)
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@exportacao_bp.route('/relatorio-completo', methods=['POST'])
def exportar_relatorio_completo():
    """Exporta relatório completo com todos os indicadores"""
    try:
        dados = request.get_json()
        ano = dados.get('ano', 2022)
        formato = dados.get('formato', 'pdf')  # pdf ou csv
        
        if formato == 'pdf':
            filepath = exportacao_service.gerar_relatorio_completo_pdf(ano)
            mimetype = 'application/pdf'
        else:
            filepath = exportacao_service.gerar_relatorio_completo_csv(ano)
            mimetype = 'text/csv'
        
        return send_file(
            filepath,
            mimetype=mimetype,
            as_attachment=True,
            download_name=os.path.basename(filepath)
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500



