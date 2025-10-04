import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Button, CircularProgress, TextField, MenuItem } from '@mui/material';
import KPICard from '../../components/common/KPICard';
import FilterPanel from '../../components/common/FilterPanel';
import LineChart from '../../components/charts/LineChart';
import BarChart from '../../components/charts/BarChart';
import * as API from '../../services/api';
import { downloadFile } from '../../utils/formatters';

const DashboardEconomia: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);
  const [ano, setAno] = useState<number>(2023);

  const [kpis, setKpis] = useState<any | null>(null);
  const [pib, setPib] = useState<any | null>(null);
  const [serieEmpresas, setSerieEmpresas] = useState<any[]>([]);
  const [topCNAE, setTopCNAE] = useState<any[]>([]);

  // Controles de métrica
  const [metricaSerie, setMetricaSerie] = useState<string>('empresas_abertas');
  const [metricaTop, setMetricaTop] = useState<string>('empresas_ativas');

  const carregar = async (filtros?: any) => {
    try {
      setLoading(true);
      setErro(null);

      const anoReq = filtros?.anoFim || ano;

      const [kpisRes, serieRes, topRes, pibRes] = await Promise.all([
        API.economiaAPI.getKPIs({ ano: anoReq, bairro_id: filtros?.bairro_id, regiao: filtros?.regiao, cnae_id: filtros?.cnae_id }),
        API.economiaAPI.getSerie({ indicador: metricaSerie, ano_inicio: filtros?.anoInicio || 2020, ano_fim: anoReq, bairro_id: filtros?.bairro_id, regiao: filtros?.regiao, cnae_id: filtros?.cnae_id }),
        API.economiaAPI.getTopCNAE({ ano: anoReq, metric: metricaTop, limit: 10, bairro_id: filtros?.bairro_id, regiao: filtros?.regiao }),
        API.economiaAPI.getPIB({ ano: anoReq })
      ]);

      setAno(anoReq);
      setKpis(kpisRes.data.dados);
      setSerieEmpresas(serieRes.data.dados || []);
      setTopCNAE((topRes.data.dados || []).map((d: any) => ({ ...d, nome: `${d.codigo} - ${d.descricao}` })));
      setPib(pibRes.data.dados || null);
    } catch (e: any) {
      console.error(e);
      setErro('Erro ao carregar dados econômicos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metricaSerie, metricaTop]);

  const onFilterChange = (f: any) => {
    carregar(f);
  };

  const onExportCSV = async () => {
    try {
      const res = await API.economiaAPI.exportCSV({ ano });
      downloadFile(res.data, `economia_${ano}.csv`);
    } catch (e) {
      console.error('Erro ao exportar CSV', e);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (erro) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography color="error">{erro}</Typography>
      </Paper>
    );
  }

  return (
    <Box>
      {/* Cabeçalho */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight={700}>Inteligência Econômica</Typography>
          <Typography variant="body1" color="text.secondary">Cascavel em Números – SEMDEC</Typography>
        </Box>
        <Button variant="contained" onClick={onExportCSV}>Exportar CSV</Button>
      </Box>

      {/* Filtros */}
      <FilterPanel onFilterChange={onFilterChange} showCNAE showBairro showSetor />

      {/* KPIs */}
      <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 2 }}>Indicadores Econômicos ({ano})</Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard title="Empresas Ativas" value={kpis?.empresas_ativas_total || 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard title="Abertas" value={kpis?.empresas_abertas_total || 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard title="Fechadas" value={kpis?.empresas_fechadas_total || 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard title="Saldo" value={kpis?.saldo_empresas || 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard title="Empregos Gerados" value={kpis?.empregos_gerados_total || 0} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard title="Massa Salarial (R$)" value={kpis?.massa_salarial_total || 0} formato="moeda" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard title="Ticket Médio (R$)" value={kpis?.ticket_medio_salarial || 0} formato="moeda" />
        </Grid>
      </Grid>

      {/* Seção Populacional - PIB */}
      <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 2 }}>Populacional • PIB Municipal ({ano})</Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard title="PIB Total" value={pib?.pib_total_mil ? (pib.pib_total_mil * 1000) : 0} formato="moeda" subtitle="Preços correntes" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard title="PIB per capita" value={pib?.pib_per_capita || 0} formato="moeda" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard title="VAB Total" value={pib?.vab_total_mil ? (pib.vab_total_mil * 1000) : 0} formato="moeda" subtitle="A preços básicos" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <KPICard title="Impostos Líquidos" value={pib?.impostos_liquidos_mil ? (pib.impostos_liquidos_mil * 1000) : 0} formato="moeda" />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <BarChart
            data={[{
              nome: 'Composição do VAB',
              Agropecuária: pib?.agropecuaria_mil || 0,
              Indústria: pib?.industria_mil || 0,
              'Serviços Privados': pib?.servicos_privados_mil || 0,
              'Adm. Pública': pib?.administracao_publica_mil || 0,
            }]}
            title="Composição do Valor Adicionado Bruto (R$ x1000)"
            dataKeys={[
              { key: 'Agropecuária', name: 'Agropecuária' },
              { key: 'Indústria', name: 'Indústria' },
              { key: 'Serviços Privados', name: 'Serviços Privados' },
              { key: 'Adm. Pública', name: 'Adm. Pública' },
            ]}
            xAxisKey="nome"
            height={320}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <BarChart
            data={[{
              nome: 'PIB',
              'PIB Total (x1000)': pib?.pib_total_mil || 0,
              'VAB Total (x1000)': pib?.vab_total_mil || 0,
              'Impostos Líquidos (x1000)': pib?.impostos_liquidos_mil || 0,
            }]}
            title="PIB x VAB x Impostos (R$ x1000)"
            dataKeys={[
              { key: 'PIB Total (x1000)', name: 'PIB Total (x1000)' },
              { key: 'VAB Total (x1000)', name: 'VAB Total (x1000)' },
              { key: 'Impostos Líquidos (x1000)', name: 'Impostos Líquidos (x1000)' },
            ]}
            xAxisKey="nome"
            height={320}
          />
        </Grid>
      </Grid>

      {/* Gráficos */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>Série Temporal</Typography>
              <TextField
                select
                size="small"
                label="Métrica"
                value={metricaSerie}
                onChange={(e) => setMetricaSerie(e.target.value)}
                sx={{ minWidth: 200 }}
              >
                <MenuItem value="empresas_abertas">Empresas Abertas</MenuItem>
                <MenuItem value="empresas_fechadas">Empresas Fechadas</MenuItem>
                <MenuItem value="empresas_ativas">Empresas Ativas</MenuItem>
                <MenuItem value="empregos_gerados">Empregos Gerados</MenuItem>
                <MenuItem value="massa_salarial">Massa Salarial</MenuItem>
              </TextField>
            </Box>
            <LineChart
              data={serieEmpresas}
              title=""
              dataKeys={[{ key: 'valor', name: metricaSerie.replace(/_/g, ' ').toUpperCase() }]}
              xAxisKey="ano"
              height={280}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight={600}>Top 10 CNAE</Typography>
              <TextField
                select
                size="small"
                label="Métrica"
                value={metricaTop}
                onChange={(e) => setMetricaTop(e.target.value)}
                sx={{ minWidth: 200 }}
              >
                <MenuItem value="empresas_ativas">Empresas Ativas</MenuItem>
                <MenuItem value="empresas_abertas">Empresas Abertas</MenuItem>
                <MenuItem value="empresas_fechadas">Empresas Fechadas</MenuItem>
                <MenuItem value="empregos_gerados">Empregos Gerados</MenuItem>
                <MenuItem value="massa_salarial">Massa Salarial</MenuItem>
              </TextField>
            </Box>
            <BarChart
              data={topCNAE}
              title=""
              dataKeys={[{ key: 'valor', name: metricaTop.replace(/_/g, ' ').toUpperCase() }]}
              xAxisKey="nome"
              height={280}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardEconomia;
