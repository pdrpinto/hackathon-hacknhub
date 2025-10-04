import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Paper,
  Chip,
} from '@mui/material';
import { School, LocalHospital, Home, TrendingUp } from '@mui/icons-material';
import CascavelMap from '../../components/maps/CascavelMap';
import LineChart from '../../components/charts/LineChart';
import axios from 'axios';
import { KPIData } from '../../types/indicadores';

const DashboardPublico: React.FC = () => {
  const [kpis, setKpis] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [serieIDH, setSerieIDH] = useState<any[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      // Usar nova API V2
      const kpisRes = await axios.get('http://localhost:5000/api/indicadores/kpis?ano=2023');
      
      // Transformar dados para o formato esperado
      const dados = kpisRes.data.dados;
      setKpis({
        educacao: {
          matriculas_total: dados.matriculas_total || 0,
          taxa_analfabetismo: dados.taxa_alfabetizacao_media ? parseFloat((100 - dados.taxa_alfabetizacao_media).toFixed(2)) : 0
        },
        saude: {
          estabelecimentos: dados.unidades_saude_total || 0,
          leitos: dados.leitos_total || 0,
          taxa_mortalidade_infantil: 10.5
        },
        infraestrutura: {
          cobertura_agua: dados.cobertura_agua_media ? parseFloat(dados.cobertura_agua_media.toFixed(1)) : 0,
          cobertura_esgoto: dados.cobertura_esgoto_media ? parseFloat(dados.cobertura_esgoto_media.toFixed(1)) : 0,
          coleta_lixo: 95.0
        }
      });

      // Série temporal de população (substituindo IDH temporariamente)
      const serieRes = await axios.get('http://localhost:5000/api/indicadores/serie-temporal/populacao?ano_inicio=2020&ano_fim=2023');
      const serieDados = serieRes.data.dados || [];
      
      // Transformar para formato do gráfico
      setSerieIDH(serieDados.map((item: any) => ({
        ano: item.ano,
        valor: item.valor / 100000 // Escalar para visualização
      })));
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box>
      {/* Cabeçalho */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom fontWeight={700}>
          Dashboard Público Interno
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Indicadores por área de atuação
        </Typography>
      </Box>

      {/* Informações Gerais */}
      <Paper sx={{ p: 3, mb: 4, background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Typography variant="h5" color="white" fontWeight={600} gutterBottom>
              Cascavel em Números - 2022
            </Typography>
            <Typography variant="body1" color="white" sx={{ mb: 2 }}>
              Dados consolidados dos principais indicadores municipais
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              <Chip label="IDH: 0.792" sx={{ backgroundColor: 'white', fontWeight: 600 }} />
              <Chip label="População: 332.333" sx={{ backgroundColor: 'white', fontWeight: 600 }} />
              <Chip label="Área: 2.086 km²" sx={{ backgroundColor: 'white', fontWeight: 600 }} />
            </Box>
          </Grid>
          <Grid item xs={12} md={4} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp sx={{ fontSize: 120, color: 'white', opacity: 0.3 }} />
          </Grid>
        </Grid>
      </Paper>

      {/* Indicadores por Área */}
      <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 2 }}>
        Indicadores por Secretaria
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Educação */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', borderTop: '4px solid #2196f3' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <School sx={{ fontSize: 40, color: '#2196f3', mr: 2 }} />
                <Typography variant="h6" fontWeight={600}>
                  Educação
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Matrículas Educação Básica
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {kpis?.educacao.matriculas_total.toLocaleString()}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Taxa de Analfabetismo
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {kpis?.educacao.taxa_analfabetismo}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Saúde */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', borderTop: '4px solid #f44336' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocalHospital sx={{ fontSize: 40, color: '#f44336', mr: 2 }} />
                <Typography variant="h6" fontWeight={600}>
                  Saúde
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Estabelecimentos de Saúde
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {kpis?.saude.estabelecimentos}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Leitos Hospitalares
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {kpis?.saude.leitos}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Infraestrutura */}
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', borderTop: '4px solid #4caf50' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Home sx={{ fontSize: 40, color: '#4caf50', mr: 2 }} />
                <Typography variant="h6" fontWeight={600}>
                  Infraestrutura
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Cobertura de Água
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {kpis?.infraestrutura.cobertura_agua.toFixed(1)}%
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Coleta de Lixo
                  </Typography>
                  <Typography variant="h5" fontWeight={600}>
                    {kpis?.infraestrutura.coleta_lixo.toFixed(1)}%
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Mapa e Gráfico */}
      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <CascavelMap height={500} showBairros={true} />
        </Grid>
        <Grid item xs={12} lg={4}>
          <LineChart
            data={serieIDH}
            title="Evolução Populacional (x100k hab)"
            dataKeys={[{ key: 'valor', name: 'População' }]}
            height={500}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardPublico;


