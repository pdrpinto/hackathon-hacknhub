import React, { useEffect, useState } from 'react';
import {
  Paper,
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Grid,
  Collapse,
  IconButton,
} from '@mui/material';
import { FilterList, ExpandMore, ExpandLess, Search } from '@mui/icons-material';
import { FiltrosState } from '../../types/indicadores';
import api from '../../services/api';

interface FilterPanelProps {
  onFilterChange: (filtros: FiltrosState) => void;
  showCNAE?: boolean;
  showBairro?: boolean;
  showSetor?: boolean;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  onFilterChange,
  showCNAE = false,
  showBairro = false,
  showSetor = false,
}) => {
  const [expanded, setExpanded] = useState(true);
  const [filtros, setFiltros] = useState<FiltrosState>({
    anoInicio: 2010,
    anoFim: 2022,
  });

  const [bairros, setBairros] = useState<Array<{ id: number; nome: string; regiao: string; loteamentos: string }>>([]);
  const [loteamentosSelecionados, setLoteamentosSelecionados] = useState<string[]>([]);

  useEffect(() => {
    if (showBairro) {
      // Carregar lista de bairros
      console.log('[FilterPanel] Carregando bairros...');
      api
        .get('/bairros')
        .then((res) => {
          console.log('[FilterPanel] Resposta da API:', res.data);
          const dados = res.data.dados || [];
          const bairrosFormatados = dados.map((b: any) => ({ 
            id: b.id, 
            nome: b.nome, 
            regiao: b.regiao || '',
            loteamentos: b.loteamentos || ''
          }));
          console.log('[FilterPanel] Bairros formatados:', bairrosFormatados.length, bairrosFormatados.slice(0, 3));
          setBairros(bairrosFormatados);
        })
        .catch((e) => {
          console.error('[FilterPanel] Erro ao carregar bairros:', e);
          console.error('[FilterPanel] Detalhes do erro:', e.response?.data);
        });
    } else {
      console.log('[FilterPanel] showBairro está false, não carregando');
    }
  }, [showBairro]);

  const handleChange = (field: keyof FiltrosState, value: any) => {
    const novosFiltros = { ...filtros, [field]: value };
    setFiltros(novosFiltros);
  };

  const handleApplyFilters = () => {
    onFilterChange(filtros);
  };

  const handleClearFilters = () => {
    const filtrosLimpos: FiltrosState = {
      anoInicio: 2010,
      anoFim: 2022,
      bairro: '',
      bairro_id: undefined,
      cnae: '',
      setor: '',
    };
    setFiltros(filtrosLimpos);
    onFilterChange(filtrosLimpos);
  };

  const anos = Array.from({ length: 13 }, (_, i) => 2010 + i);

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <FilterList color="primary" />
          <Typography variant="h6" fontWeight={600}>
            Filtros
          </Typography>
        </Box>
        <IconButton onClick={() => setExpanded(!expanded)} size="small">
          {expanded ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Grid container spacing={2}>
          {/* Filtro de Período */}
          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="Ano Início"
              value={filtros.anoInicio || 2010}
              onChange={(e) => handleChange('anoInicio', Number(e.target.value))}
              size="small"
            >
              {anos.map((ano) => (
                <MenuItem key={ano} value={ano}>
                  {ano}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <TextField
              select
              fullWidth
              label="Ano Fim"
              value={filtros.anoFim || 2022}
              onChange={(e) => handleChange('anoFim', Number(e.target.value))}
              size="small"
            >
              {anos.map((ano) => (
                <MenuItem key={ano} value={ano}>
                  {ano}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          {/* Filtro de CNAE */}
          {showCNAE && (
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="CNAE"
                value={filtros.cnae || ''}
                onChange={(e) => handleChange('cnae', e.target.value)}
                size="small"
                placeholder="Digite o código CNAE"
              />
            </Grid>
          )}

          {/* Filtro de Setor */}
          {showSetor && (
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                select
                fullWidth
                label="Setor"
                value={filtros.setor || ''}
                onChange={(e) => handleChange('setor', e.target.value)}
                size="small"
              >
                <MenuItem value="">Todos</MenuItem>
                <MenuItem value="Primário">Primário</MenuItem>
                <MenuItem value="Secundário">Secundário</MenuItem>
                <MenuItem value="Terciário">Terciário</MenuItem>
                <MenuItem value="Público">Público</MenuItem>
              </TextField>
            </Grid>
          )}

          {/* Filtro de Bairro */}
          {showBairro && (
            <>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  select
                  fullWidth
                  label="Bairro"
                  value={filtros.bairro_id ?? ''}
                  onChange={(e) => {
                    const v = e.target.value;
                    const bairroId = v === '' ? undefined : Number(v);
                    handleChange('bairro_id', bairroId);
                    
                    // Atualizar loteamentos disponíveis
                    if (bairroId) {
                      const bairro = bairros.find(b => b.id === bairroId);
                      if (bairro && bairro.loteamentos) {
                        setLoteamentosSelecionados(bairro.loteamentos.split(',').map(l => l.trim()));
                      } else {
                        setLoteamentosSelecionados([]);
                      }
                    } else {
                      setLoteamentosSelecionados([]);
                    }
                  }}
                  size="small"
                >
                  <MenuItem value="">Todos</MenuItem>
                  {bairros.map((b) => (
                    <MenuItem key={b.id} value={b.id}>
                      {b.nome} ({b.regiao})
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              
              {/* Filtro de Loteamento (aparece apenas quando bairro é selecionado) */}
              {loteamentosSelecionados.length > 0 && (
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    select
                    fullWidth
                    label="Loteamento"
                    value={filtros.loteamento || ''}
                    onChange={(e) => handleChange('loteamento', e.target.value)}
                    size="small"
                  >
                    <MenuItem value="">Todos do Bairro</MenuItem>
                    {loteamentosSelecionados.map((lote, idx) => (
                      <MenuItem key={idx} value={lote}>{lote}</MenuItem>
                    ))}
                  </TextField>
                </Grid>
              )}
            </>
          )}

          {/* Botões de Ação */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
              <Button
                variant="outlined"
                onClick={handleClearFilters}
                size="small"
              >
                Limpar Filtros
              </Button>
              <Button
                variant="contained"
                startIcon={<Search />}
                onClick={handleApplyFilters}
                size="small"
              >
                Aplicar Filtros
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Collapse>
    </Paper>
  );
};

export default FilterPanel;



