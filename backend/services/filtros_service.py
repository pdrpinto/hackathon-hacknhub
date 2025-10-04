"""
Service para aplicar filtros aos dados
"""

class FiltrosService:
    """Serviço para filtrar dados por período, CNAE, bairro, etc."""
    
    def aplicar_filtro_periodo(self, query, model, ano_inicio=None, ano_fim=None):
        """Aplica filtro de período a uma query"""
        if ano_inicio:
            query = query.filter(model.ano_referencia >= ano_inicio)
        if ano_fim:
            query = query.filter(model.ano_referencia <= ano_fim)
        return query
    
    def aplicar_filtro_cnae(self, query, codigo_cnae=None, setor=None):
        """Aplica filtro de CNAE (a ser implementado com dados reais)"""
        # Mock para MVP - será implementado quando houver dados de CNAE por registro
        return query
    
    def aplicar_filtro_bairro(self, query, bairro_id=None):
        """Aplica filtro de bairro (a ser implementado com dados reais)"""
        # Mock para MVP - será implementado quando houver dados por bairro
        return query
    
    def validar_filtros(self, filtros):
        """Valida os filtros recebidos"""
        erros = []
        
        if 'ano_inicio' in filtros and 'ano_fim' in filtros:
            if filtros['ano_inicio'] > filtros['ano_fim']:
                erros.append('Ano inicial não pode ser maior que ano final')
        
        return {
            'valido': len(erros) == 0,
            'erros': erros
        }



