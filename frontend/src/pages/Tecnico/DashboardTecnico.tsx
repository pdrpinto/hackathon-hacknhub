import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
  Tabs,
  Tab,
  Button,
} from '@mui/material';
import { GetApp } from '@mui/icons-material';
import FilterPanel from '../../components/common/FilterPanel';
import LineChart from '../../components/charts/LineChart';
import BarChart from '../../components/charts/BarChart';
import { indicadoresAPI, exportacaoAPI } from '../../services/api';
import { FiltrosState, DemografiaData, EducacaoData, SaudeData } from '../../types/indicadores';
import { formatNumber, formatPercent, downloadFile } from '../../utils/formatters';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const DashboardTecnico: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [demografiaData, setDemografiaData] = useState<DemografiaData[]>([]);
  const [educacaoData, setEducacaoData] = useState<EducacaoData[]>([]);
  const [saudeData, setSaudeData] = useState<SaudeData[]>([]);
  const [filtros, setFiltros] = useState<FiltrosState>({
    anoInicio: 2010,
    anoFim: 2022,
  });

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [demoRes, eduRes, saudeRes] = await Promise.all([
        indicadoresAPI.getDemografia(filtros.anoInicio, filtros.anoFim),
        indicadoresAPI.getEducacao(filtros.anoInicio, filtros.anoFim),
        indicadoresAPI.getSaude(filtros.anoInicio, filtros.anoFim),
      ]);

      setDemografiaData(demoRes.data);
      setEducacaoData(eduRes.data);
      setSaudeData(saudeRes.data);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = async (tipo: string) => {
    try {
      const response = await exportacaoAPI.exportarCSV(tipo, filtros);
      downloadFile(response.data, `cascavel_${tipo}_${Date.now()}.csv`);
    } catch (err) {
      console.error('Erro ao exportar CSV:', err);
    }
  };

  const handleFilterChange = (novosFiltros: FiltrosState) => {
    setFiltros(novosFiltros);
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
          Dashboard Técnico
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Análise detalhada dos indicadores municipais
        </Typography>
      </Box>

      {/* Filtros */}
      <FilterPanel
        onFilterChange={handleFilterChange}
        showCNAE={true}
        showBairro={true}
        showSetor={true}
      />

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(_, newValue) => setTabValue(newValue)}
          variant="fullWidth"
        >
          <Tab label="Demografia" />
          <Tab label="Educação" />
          <Tab label="Saúde" />
        </Tabs>
      </Paper>

      {/* Tab: Demografia */}
      <TabPanel value={tabValue} index={0}>
        <Box sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<GetApp />}
            onClick={() => handleExportCSV('demografia')}
            sx={{ mb: 2 }}
          >
            Exportar CSV
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <LineChart
              data={demografiaData.map((d) => ({
                ano: d.ano_referencia,
                populacao: d.populacao_estimada,
              }))}
              title="Evolução Populacional"
              dataKeys={[{ key: 'populacao', name: 'População' }]}
              height={300}
            />
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Ano</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>População</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Densidade</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Urbanização</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Crescimento</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {demografiaData.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.ano_referencia}</TableCell>
                  <TableCell>{formatNumber(row.populacao_estimada)}</TableCell>
                  <TableCell>{formatNumber(row.densidade_demografica)} hab/km²</TableCell>
                  <TableCell>{formatPercent(row.grau_urbanizacao)}</TableCell>
                  <TableCell>{formatPercent(row.taxa_crescimento_populacional)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Tab: Educação */}
      <TabPanel value={tabValue} index={1}>
        <Box sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<GetApp />}
            onClick={() => handleExportCSV('educacao')}
            sx={{ mb: 2 }}
          >
            Exportar CSV
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <BarChart
              data={educacaoData.map((d) => ({
                ano: d.ano_referencia,
                basica: d.matriculas_educacao_basica,
                superior: d.matriculas_educacao_superior_presencial,
              }))}
              title="Matrículas por Nível"
              dataKeys={[
                { key: 'basica', name: 'Educação Básica' },
                { key: 'superior', name: 'Ensino Superior' },
              ]}
              xAxisKey="ano"
              height={300}
            />
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Ano</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Ed. Básica</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Fundamental</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Médio</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Analfabetismo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {educacaoData.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.ano_referencia}</TableCell>
                  <TableCell>{formatNumber(row.matriculas_educacao_basica)}</TableCell>
                  <TableCell>{formatNumber(row.matriculas_ensino_fundamental)}</TableCell>
                  <TableCell>{formatNumber(row.matriculas_ensino_medio)}</TableCell>
                  <TableCell>{formatPercent(row.taxa_analfabetismo)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      {/* Tab: Saúde */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ mb: 3 }}>
          <Button
            variant="outlined"
            startIcon={<GetApp />}
            onClick={() => handleExportCSV('saude')}
            sx={{ mb: 2 }}
          >
            Exportar CSV
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <LineChart
              data={saudeData.map((d) => ({
                ano: d.ano_referencia,
                mortalidade: d.taxa_mortalidade_infantil,
              }))}
              title="Taxa de Mortalidade Infantil"
              dataKeys={[{ key: 'mortalidade', name: 'Taxa (por mil)' }]}
              height={300}
            />
          </Grid>
        </Grid>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#1976d2' }}>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Ano</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Estabelecimentos</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Leitos</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Mort. Infantil</TableCell>
                <TableCell sx={{ color: 'white', fontWeight: 600 }}>Natalidade</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {saudeData.map((row) => (
                <TableRow key={row.id} hover>
                  <TableCell>{row.ano_referencia}</TableCell>
                  <TableCell>{formatNumber(row.estabelecimentos_saude)}</TableCell>
                  <TableCell>{formatNumber(row.leitos_hospitalares)}</TableCell>
                  <TableCell>{formatNumber(row.taxa_mortalidade_infantil)}‰</TableCell>
                  <TableCell>{formatNumber(row.taxa_natalidade)}‰</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>
    </Box>
  );
};

export default DashboardTecnico;


