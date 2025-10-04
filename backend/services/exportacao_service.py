"""
Service para exportação de dados em PDF e CSV
"""
import os
import csv
from datetime import datetime
from reportlab.lib.pagesizes import letter, A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.units import inch
from reportlab.platypus import SimpleDocTemplate, Table, TableStyle, Paragraph, Spacer, PageBreak
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from models import AreaDemografica, Educacao, Saude, DomiciliosSaneamento, IDHRenda
from config import Config

class ExportacaoService:
    """Serviço para exportar dados em diferentes formatos"""
    
    def __init__(self):
        self.export_folder = Config.EXPORT_FOLDER
    
    def exportar_csv(self, tipo_dados, filtros):
        """Exporta dados para CSV"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f'cascavel_{tipo_dados}_{timestamp}.csv'
        filepath = os.path.join(self.export_folder, filename)
        
        # Buscar dados baseado no tipo
        dados = self._buscar_dados(tipo_dados, filtros)
        
        # Escrever CSV
        with open(filepath, 'w', newline='', encoding='utf-8') as csvfile:
            if len(dados) > 0:
                writer = csv.DictWriter(csvfile, fieldnames=dados[0].keys())
                writer.writeheader()
                writer.writerows(dados)
        
        return filepath
    
    def exportar_pdf(self, tipo_relatorio, filtros):
        """Exporta relatório em PDF"""
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f'relatorio_cascavel_{tipo_relatorio}_{timestamp}.pdf'
        filepath = os.path.join(self.export_folder, filename)
        
        # Criar documento PDF
        doc = SimpleDocTemplate(filepath, pagesize=A4)
        story = []
        styles = getSampleStyleSheet()
        
        # Estilo customizado para título
        titulo_style = ParagraphStyle(
            'CustomTitle',
            parent=styles['Heading1'],
            fontSize=18,
            textColor=colors.HexColor('#1976d2'),
            spaceAfter=30,
            alignment=TA_CENTER
        )
        
        # Título
        story.append(Paragraph('Cascavel em Números', titulo_style))
        story.append(Paragraph(f'Relatório - {tipo_relatorio.title()}', styles['Heading2']))
        story.append(Paragraph(f'Gerado em: {datetime.now().strftime("%d/%m/%Y %H:%M")}', styles['Normal']))
        story.append(Spacer(1, 20))
        
        # Buscar e adicionar dados
        if tipo_relatorio == 'completo':
            story.extend(self._gerar_conteudo_completo(filtros, styles))
        elif tipo_relatorio == 'demografia':
            story.extend(self._gerar_conteudo_demografia(filtros, styles))
        elif tipo_relatorio == 'educacao':
            story.extend(self._gerar_conteudo_educacao(filtros, styles))
        
        # Gerar PDF
        doc.build(story)
        
        return filepath
    
    def gerar_relatorio_completo_pdf(self, ano):
        """Gera relatório completo em PDF"""
        return self.exportar_pdf('completo', {'ano': ano})
    
    def gerar_relatorio_completo_csv(self, ano):
        """Gera relatório completo em CSV"""
        return self.exportar_csv('completo', {'ano': ano})
    
    def _buscar_dados(self, tipo_dados, filtros):
        """Busca dados baseado no tipo e filtros"""
        ano = filtros.get('ano', 2022)
        
        if tipo_dados == 'demografia':
            registros = AreaDemografica.query.filter_by(ano_referencia=ano).all()
            return [r.to_dict() for r in registros]
        
        elif tipo_dados == 'educacao':
            registros = Educacao.query.filter_by(ano_referencia=ano).all()
            return [r.to_dict() for r in registros]
        
        elif tipo_dados == 'saude':
            registros = Saude.query.filter_by(ano_referencia=ano).all()
            return [r.to_dict() for r in registros]
        
        elif tipo_dados == 'completo':
            # Retorna dados de todas as áreas
            dados_completos = []
            
            demo = AreaDemografica.query.filter_by(ano_referencia=ano).first()
            if demo:
                dados_completos.append(demo.to_dict())
            
            edu = Educacao.query.filter_by(ano_referencia=ano).first()
            if edu:
                dados_completos.append(edu.to_dict())
            
            saude = Saude.query.filter_by(ano_referencia=ano).first()
            if saude:
                dados_completos.append(saude.to_dict())
            
            return dados_completos
        
        return []
    
    def _gerar_conteudo_completo(self, filtros, styles):
        """Gera conteúdo completo do relatório"""
        content = []
        ano = filtros.get('ano', 2022)
        
        # Demografia
        content.append(Paragraph('1. DADOS DEMOGRÁFICOS', styles['Heading2']))
        demo = AreaDemografica.query.filter_by(ano_referencia=ano).first()
        if demo:
            data = [
                ['Indicador', 'Valor'],
                ['População Estimada', f"{demo.populacao_estimada:,}"],
                ['Densidade Demográfica', f"{float(demo.densidade_demografica) if demo.densidade_demografica else 0:.2f} hab/km²"],
                ['Grau de Urbanização', f"{float(demo.grau_urbanizacao) if demo.grau_urbanizacao else 0:.2f}%"],
            ]
            table = Table(data, colWidths=[4*inch, 2*inch])
            table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1976d2')),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, 0), 12),
                ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                ('GRID', (0, 0), (-1, -1), 1, colors.black)
            ]))
            content.append(table)
        
        content.append(Spacer(1, 20))
        
        # Educação
        content.append(Paragraph('2. EDUCAÇÃO', styles['Heading2']))
        edu = Educacao.query.filter_by(ano_referencia=ano).first()
        if edu:
            data = [
                ['Indicador', 'Valor'],
                ['Matrículas Educação Básica', f"{edu.matriculas_educacao_basica:,}"],
                ['Taxa de Analfabetismo', f"{float(edu.taxa_analfabetismo) if edu.taxa_analfabetismo else 0:.2f}%"],
            ]
            table = Table(data, colWidths=[4*inch, 2*inch])
            table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1976d2')),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, 0), 12),
                ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                ('GRID', (0, 0), (-1, -1), 1, colors.black)
            ]))
            content.append(table)
        
        content.append(Spacer(1, 20))
        
        # Saúde
        content.append(Paragraph('3. SAÚDE', styles['Heading2']))
        saude = Saude.query.filter_by(ano_referencia=ano).first()
        if saude:
            data = [
                ['Indicador', 'Valor'],
                ['Estabelecimentos de Saúde', f"{saude.estabelecimentos_saude:,}"],
                ['Leitos Hospitalares', f"{saude.leitos_hospitalares:,}"],
                ['Taxa Mortalidade Infantil', f"{float(saude.taxa_mortalidade_infantil) if saude.taxa_mortalidade_infantil else 0:.2f}‰"],
            ]
            table = Table(data, colWidths=[4*inch, 2*inch])
            table.setStyle(TableStyle([
                ('BACKGROUND', (0, 0), (-1, 0), colors.HexColor('#1976d2')),
                ('TEXTCOLOR', (0, 0), (-1, 0), colors.whitesmoke),
                ('ALIGN', (0, 0), (-1, -1), 'LEFT'),
                ('FONTNAME', (0, 0), (-1, 0), 'Helvetica-Bold'),
                ('FONTSIZE', (0, 0), (-1, 0), 12),
                ('BOTTOMPADDING', (0, 0), (-1, 0), 12),
                ('GRID', (0, 0), (-1, -1), 1, colors.black)
            ]))
            content.append(table)
        
        return content
    
    def _gerar_conteudo_demografia(self, filtros, styles):
        """Gera conteúdo específico de demografia"""
        return self._gerar_conteudo_completo(filtros, styles)[:2]  # Apenas seção de demografia
    
    def _gerar_conteudo_educacao(self, filtros, styles):
        """Gera conteúdo específico de educação"""
        content = self._gerar_conteudo_completo(filtros, styles)
        return content[3:5] if len(content) > 4 else []  # Apenas seção de educação



