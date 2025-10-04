import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  Alert,
  Button,
} from '@mui/material';
import {
  People,
  School,
  LocalHospital,
  Home,
  TrendingUp,
  GetApp,
} from '@mui/icons-material';
import KPICard from '../../components/common/KPICard';
import FilterPanel from '../../components/common/FilterPanel';
import AlertBadge from '../../components/common/AlertBadge';
import MapaInterativo from '../../components/maps/MapaInterativo';
import LineChart from '../../components/charts/LineChart';
import axios from 'axios';
import { exportacaoAPI } from '../../services/api';
import { KPIData, AlertaData, FiltrosState } from '../../types/indicadores';
import { downloadFile } from '../../utils/formatters';

const DashboardGestao: React.FC = () => {
  const [kpis, setKpis] = useState<any | null>(null);
  const [alertas, setAlertas] = useState<AlertaData[]>([]);
  const [serieDemografia, setSerieDemografia] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtros, setFiltros] = useState<FiltrosState>({
    anoInicio: 2010,
    anoFim: 2022,
  });

  useEffect(() => {
    fetchData();
  }, [filtros]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Usar nova API V2
      const ano = filtros.anoInicio || 2023;
      const kpisRes = await axios.get(`http://localhost:5000/api/indicadores/kpis?ano=${ano}`);
      const dados = kpisRes.data.dados;
      
      setKpis({
        populacao: {
          valor: dados.populacao_total || 0,
          variacao: 1.5
        },
        densidade: {
          valor: dados.densidade_media || 0,
          variacao: 0.8
        },
        idh: {
          valor: dados.idh_medio || 0,
          variacao: 2.1
        },
        educacao: {
          matriculas_total: dados.matriculas_total || 0,
          taxa_analfabetismo: dados.taxa_alfabetizacao_media ? (100 - dados.taxa_alfabetizacao_media) : 5.0
        },
        saude: {
          estabelecimentos: dados.unidades_saude_total || 0,
          leitos: dados.leitos_total || 0,
          taxa_mortalidade_infantil: 10.5
        },
        infraestrutura: {
          cobertura_agua: dados.cobertura_agua_media || 0,
          cobertura_esgoto: dados.cobertura_esgoto_media || 0,
          coleta_lixo: 95.0
        },
        economia: {
          empresas_ativas: dados.empresas_ativas_total || 0,
          empregos_formais: dados.empregos_formais_total || 0,
          renda_media: dados.renda_media || 0
        }
      });

      // Sem alertas na V2
      setAlertas([]);

      // Série temporal de população
      const serieRes = await axios.get('http://localhost:5000/api/indicadores/serie-temporal/populacao?ano_inicio=2020&ano_fim=2023');
      setSerieDemografia(serieRes.data.dados || []);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError('Erro ao carregar dados do dashboard');
    } finally {
      setLoading(false);
    }
  };

  const handleExportPDF = async () => {
    try {
      const response = await exportacaoAPI.exportarRelatorioCompleto(2022, 'pdf');
      downloadFile(response.data, 'relatorio_cascavel_2022.pdf');
    } catch (err) {
      console.error('Erro ao exportar PDF:', err);
    }
  };

  const handleFilterChange = (novosFiltros: FiltrosState) => {
    setFiltros(novosFiltros);
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mb: 3 }}>
        {error}
      </Alert>
    );
  }

  return (
    <Box>
      {/* Cabeçalho */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" gutterBottom fontWeight={700}>
            Dashboard Executivo
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Visão geral dos principais indicadores de Cascavel
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<GetApp />}
          onClick={handleExportPDF}
          sx={{ height: 'fit-content' }}
        >
          Exportar Relatório
        </Button>
      </Box>

      {/* Filtros */}
      <FilterPanel onFilterChange={handleFilterChange} />

      {/* Alertas removidos na V2 */}

      {/* KPIs Principais */}
      <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 2 }}>
        Indicadores Principais
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="População"
            value={kpis?.populacao.valor || 0}
            variacao={kpis?.populacao.variacao}
            tendencia={kpis?.populacao.tendencia}
            icon={<People fontSize="large" />}
            formato="numero"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="IDH Municipal"
            value={kpis?.idh.valor || 0}
            subtitle={`Estado: ${kpis?.idh.comparacao_estado || 0}`}
            icon={<TrendingUp fontSize="large" />}
            formato="texto"
            color="#4caf50"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Matrículas"
            value={kpis?.educacao.matriculas_total || 0}
            subtitle={`Analfabetismo: ${kpis?.educacao.taxa_analfabetismo || 0}%`}
            icon={<School fontSize="large" />}
            formato="numero"
            color="#2196f3"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard
            title="Leitos Hospitalares"
            value={kpis?.saude.leitos || 0}
            subtitle={`${kpis?.saude.estabelecimentos || 0} estabelecimentos`}
            icon={<LocalHospital fontSize="large" />}
            formato="numero"
            color="#f44336"
          />
        </Grid>
      </Grid>

      {/* Mapa e Gráficos */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} lg={7}>
          <MapaInterativo height={500} />
        </Grid>
        <Grid item xs={12} lg={5}>
          <LineChart
            data={serieDemografia}
            title="Evolução Populacional"
            dataKeys={[{ key: 'valor', name: 'População' }]}
            height={500}
          />
        </Grid>
      </Grid>

      {/* Infraestrutura */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <KPICard
            title="Cobertura de Água"
            value={kpis?.infraestrutura.cobertura_agua || 0}
            icon={<Home fontSize="large" />}
            formato="percentual"
            color="#00bcd4"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <KPICard
            title="Cobertura de Esgoto"
            value={kpis?.infraestrutura.cobertura_esgoto || 0}
            icon={<Home fontSize="large" />}
            formato="percentual"
            color="#009688"
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <KPICard
            title="Coleta de Lixo"
            value={kpis?.infraestrutura.coleta_lixo || 0}
            icon={<Home fontSize="large" />}
            formato="percentual"
            color="#8bc34a"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardGestao;


