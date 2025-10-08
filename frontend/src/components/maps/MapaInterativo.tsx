import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, CircleMarker, Popup, LayersControl, useMap, ScaleControl } from 'react-leaflet';
import { Box, Paper, Typography, CircularProgress, Stack } from '@mui/material';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useFiltersStore } from '../../store/filters';

// Fix Leaflet default icon paths
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
// Tipos mínimos locais para evitar dependência direta de 'geojson'
type Geometry = any;
type GeoJsonProperties = any;
interface Feature<G = Geometry, P = GeoJsonProperties> {
  type: string;
  properties: P;
  geometry: G;
}

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface BairroFeature extends Feature<Geometry, GeoJsonProperties> {
  properties: {
    id: number;
    nome: string;
    regiao: string;
    cor: string;
    populacao: number;
    empresas_ativas: number;
    renda_media: number;
  };
}

interface MapaInterativoProps {
  height?: number;
  centerBairro?: number | null;
  onBairroClick?: (bairroId: number, bairroNome: string) => void;
}

const MapaInterativo: React.FC<MapaInterativoProps> = ({ 
  height = 600,
  centerBairro = null,
  onBairroClick
}) => {
  const navigate = useNavigate();
  const { setBairroId } = useFiltersStore();
  const [geojsonData, setGeojsonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBairro, setSelectedBairro] = useState<number | null>(null);
  const [pois, setPois] = useState<Array<{ lat: number; lon: number; name?: string; type: 'hospital' | 'school' }>>([]);
  const [showHospitais, setShowHospitais] = useState(true);
  const [showEscolas, setShowEscolas] = useState(true);
  const [indicator, setIndicator] = useState<'populacao' | 'empresas_ativas' | 'renda_media'>('empresas_ativas');
  const [showHeat, setShowHeat] = useState(false);
  const featureCentersRef = useRef<Record<number, [number, number]>>({});

  // Centro de Cascavel, PR
  const cascavelCenter: LatLngExpression = useMemo<LatLngExpression>(() => ([-24.955, -53.455]), []);

  // Buscar dados do mapa e POIs
  const fetchMapData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/bairros/mapa/geojson');
      // Parse GeoJSON strings in features
      const parsedFeatures = response.data.features.map((feature: any) => ({
        ...feature,
        geometry: typeof feature.geometry === 'string' ? JSON.parse(feature.geometry) : feature.geometry
      }));
      setGeojsonData({
        type: 'FeatureCollection',
        features: parsedFeatures
      });
      setError(null);
    } catch (err: any) {
      console.error('Erro ao carregar dados do mapa:', err);
      setError(err.message || 'Erro ao carregar mapa');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPOIs = useCallback(async () => {
    try {
      const query = `data=[out:json][timeout:25];(node["amenity"="hospital"](around:15000,${(cascavelCenter as number[])[0]},${(cascavelCenter as number[])[1]});node["amenity"="school"](around:15000,${(cascavelCenter as number[])[0]},${(cascavelCenter as number[])[1]}););out;`;
      const url = `https://overpass-api.de/api/interpreter?${query}`;
      const resp = await axios.get(url);
      const items = (resp.data?.elements || [])
        .filter((el: any) => el.type === 'node')
        .map((el: any) => ({
          lat: el.lat,
          lon: el.lon,
          name: el.tags?.name,
          type: el.tags?.amenity === 'hospital' ? 'hospital' as const : 'school' as const,
        }));
      setPois(items);
    } catch (e) {
      // silenciar falhas de rede externas
    }
  }, [cascavelCenter]);

  useEffect(() => {
    fetchMapData();
    fetchPOIs();
  }, [fetchMapData, fetchPOIs]);

  // Overpass comentado acima transformado em callback

  // Geocodificador simples (Nominatim)
  const Geocoder: React.FC = () => {
    const map = useMap();
    const [q, setQ] = useState('');
    const [busy, setBusy] = useState(false);
    const onSearch = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!q) return;
      try {
        setBusy(true);
        const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q + ', Cascavel, PR, Brasil')}`;
        const res = await axios.get(url, { headers: { 'Accept-Language': 'pt-BR' } });
        const first = res.data?.[0];
        if (first) {
          map.setView([Number(first.lat), Number(first.lon)], 14);
        }
      } finally {
        setBusy(false);
      }
    };
    return (
      <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 1000, backgroundColor: 'rgba(255,255,255,0.95)', p: 1, borderRadius: 2, boxShadow: 3 }}>
        <form onSubmit={onSearch} style={{ display: 'flex', gap: 8 }}>
          <input
            placeholder="Buscar endereço/bairro"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ padding: '8px 10px', border: '1px solid #e0e0e0', borderRadius: 8, minWidth: 220 }}
          />
          <button type="submit" disabled={busy} style={{ padding: '8px 12px', borderRadius: 8, border: 'none', background: '#0a2541', color: '#fff' }}>
            {busy ? '...' : 'Buscar'}
          </button>
        </form>
      </Box>
    );
  };

  const getColorByRegiao = (regiao: string): string => {
    const cores: { [key: string]: string } = {
      'Centro': '#2E7D32',
      'Norte': '#1976D2',
      'Sul': '#C62828',
      'Leste': '#F57C00',
      'Oeste': '#7B1FA2'
    };
    return cores[regiao] || '#9E9E9E';
  };

  const indicatorStats = useMemo(() => {
    if (!geojsonData) return { min: 0, max: 0 };
    const vals: number[] = (geojsonData.features || [])
      .map((f: BairroFeature) => Number(f?.properties?.[indicator] || 0))
      .filter((v: number) => Number.isFinite(v));
    const min = Math.min(...(vals.length ? vals : [0]));
    const max = Math.max(...(vals.length ? vals : [1]));
    return { min, max };
  }, [geojsonData, indicator]);

  const scaleColor = (val: number) => {
    const { min, max } = indicatorStats;
    const t = max === min ? 0.5 : (val - min) / (max - min);
    // azul -> ciano -> amarelo
    const h = 210 - 60 * t; // 210 (azul) a 150 (ciano)
    const l = 40 + 15 * t; // leve aumento de luminosidade
    return `hsl(${h}, 85%, ${l}%)`;
  };

  const topBairros = useMemo(() => {
    const feats: BairroFeature[] = geojsonData?.features || [];
    const arr = feats
      .map((f) => ({ id: f.properties.id, nome: f.properties.nome, valor: Number(f.properties[indicator] || 0) }))
      .filter((x) => Number.isFinite(x.valor));
    return arr.sort((a, b) => b.valor - a.valor).slice(0, 3);
  }, [geojsonData, indicator]);

  const exportCsv = useCallback(() => {
    const feats: BairroFeature[] = geojsonData?.features || [];
    if (!feats.length) return;
    const header = ['id', 'nome', indicator].join(',');
    const rows = feats.map((f) => [f.properties.id, `"${(f.properties.nome || '').replace(/"/g, '"')}"`, f.properties[indicator] ?? ''].join(','));
    const csv = [header, ...rows].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `cascavel_${indicator}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }, [geojsonData, indicator]);

  const style = (feature?: BairroFeature) => {
    if (!feature) return {};
    
    const isSelected = selectedBairro === feature.properties.id;
    const baseVal = Number(feature.properties[indicator] || 0);
    const cor = scaleColor(baseVal) || feature.properties.cor || getColorByRegiao(feature.properties.regiao);
    
    return {
      fillColor: cor,
      weight: isSelected ? 3 : 1.5,
      opacity: 1,
      color: isSelected ? '#FFD700' : '#ffffff',
      dashArray: '',
      fillOpacity: isSelected ? 0.85 : 0.6
    };
  };

  const onEachFeature = (feature: BairroFeature, layer: L.Layer) => {
    const props = feature.properties;
    // Guardar centro aproximado para overlay de calor
    if ((layer as any).getBounds) {
      const center = (layer as any).getBounds().getCenter();
      featureCentersRef.current[props.id] = [center.lat, center.lng];
    }
    
    // Popup content
    const popupContent = `
      <div style="font-family: Arial, sans-serif;">
        <h3 style="margin: 0 0 10px 0; color: ${props.cor};">${props.nome}</h3>
        <p style="margin: 5px 0;"><strong>Região:</strong> ${props.regiao}</p>
        <p style="margin: 5px 0;"><strong>População:</strong> ${(props.populacao || 0).toLocaleString('pt-BR')}</p>
        <p style="margin: 5px 0;"><strong>Empresas Ativas:</strong> ${(props.empresas_ativas || 0).toLocaleString('pt-BR')}</p>
        <p style="margin: 5px 0;"><strong>Renda Média:</strong> R$ ${(props.renda_media || 0).toLocaleString('pt-BR', {minimumFractionDigits: 2})}</p>
      </div>
    `;
    
    layer.bindPopup(popupContent);
    
    // Mouse events
    layer.on({
      mouseover: (e) => {
        const layer = e.target;
        layer.setStyle({
          weight: 3,
          color: '#FFD700',
          fillOpacity: 0.8
        });
      },
      mouseout: (e) => {
        const layer = e.target;
        if (selectedBairro !== props.id) {
          layer.setStyle(style(feature));
        }
      },
      click: (e) => {
        setSelectedBairro(props.id);
        if (onBairroClick) {
          onBairroClick(props.id, props.nome);
        }
      }
    });
  };

  // Legenda por região
  const legendaRegioes = [
    { nome: 'Centro', cor: '#2E7D32' },
    { nome: 'Norte', cor: '#1976D2' },
    { nome: 'Sul', cor: '#C62828' },
    { nome: 'Leste', cor: '#F57C00' },
    { nome: 'Oeste', cor: '#7B1FA2' }
  ];

  if (loading) {
    return (
      <Paper sx={{ p: 3, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={60} />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper sx={{ p: 3, height, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 0, height, position: 'relative', overflow: 'hidden' }}>
      {/* Painel flutuante de indicador e ações */}
      <Box sx={{ position: 'absolute', top: 20, left: 20, zIndex: 1001, backgroundColor: 'rgba(255,255,255,0.95)', p: 2, borderRadius: 2, boxShadow: 3, display: 'grid', gap: 1 }}>
        <Typography variant="subtitle2" fontWeight={600}>Camadas e Indicador</Typography>
        <select className="input" value={indicator} onChange={(e) => setIndicator(e.target.value as any)} style={{ padding: 8 }}>
          <option value="empresas_ativas">Empresas Ativas</option>
          <option value="populacao">População</option>
          <option value="renda_media">Renda Média</option>
        </select>
        <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
          <input type="checkbox" checked={showHeat} onChange={(e) => setShowHeat(e.target.checked)} /> Exibir intensidade (heat)
        </label>
      </Box>
      <Box sx={{ position: 'absolute', top: 20, left: 260, zIndex: 1001, backgroundColor: 'rgba(255,255,255,0.95)', p: 1, borderRadius: 2, boxShadow: 2, display: 'flex', gap: 8, alignItems: 'center' }}>
        <Typography variant="caption" sx={{ color: '#555' }}>Indicador:</Typography>
        <Typography variant="body2" fontWeight={600}>{indicator.replace('_', ' ')}</Typography>
        <span style={{ width: 1, height: 20, background: '#e0e0e0' }} />
        <Typography variant="caption" sx={{ color: '#555' }}>Min</Typography>
        <Typography variant="body2">{indicatorStats.min.toLocaleString('pt-BR')}</Typography>
        <Typography variant="caption" sx={{ color: '#555', ml: 1 }}>Max</Typography>
        <Typography variant="body2">{indicatorStats.max.toLocaleString('pt-BR')}</Typography>
        <button onClick={exportCsv} style={{ marginLeft: 8, padding: '6px 10px', borderRadius: 8, border: '1px solid #e0e0e0', background: '#fff', cursor: 'pointer' }}>Exportar CSV</button>
      </Box>
      {/* Legenda */}
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          right: 20,
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          p: 2,
          borderRadius: 2,
          boxShadow: 3
        }}
      >
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Regiões de Cascavel
        </Typography>
        <Stack spacing={1}>
          {legendaRegioes.map((item) => (
            <Box key={item.nome} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  backgroundColor: item.cor,
                  border: '1px solid #fff',
                  borderRadius: 0.5
                }}
              />
              <Typography variant="caption">{item.nome}</Typography>
            </Box>
          ))}
        </Stack>
        <Box sx={{ mt: 2, display: 'grid', gap: 1 }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
            <input type="checkbox" checked={showHospitais} onChange={(e) => setShowHospitais(e.target.checked)} /> Hospitais
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12 }}>
            <input type="checkbox" checked={showEscolas} onChange={(e) => setShowEscolas(e.target.checked)} /> Escolas
          </label>
        </Box>
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" fontWeight={600}>Escala do indicador</Typography>
          <Box sx={{ height: 10, background: 'linear-gradient(90deg, hsl(210,85%,40%) 0%, hsl(150,85%,55%) 100%)', borderRadius: 1, mt: 0.5 }} />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#555', mt: 0.5 }}>
            <span>{indicatorStats.min.toLocaleString('pt-BR')}</span>
            <span>{indicatorStats.max.toLocaleString('pt-BR')}</span>
          </Box>
        </Box>
        {!!topBairros.length && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" fontWeight={600}>Top 3 bairros ({indicator.replace('_',' ')})</Typography>
            <Stack spacing={0.5} sx={{ mt: 0.5 }}>
              {topBairros.map((b, i) => (
                <Box key={b.id} sx={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                  <span>{i + 1}. {b.nome}</span>
                  <strong>{b.valor.toLocaleString('pt-BR')}</strong>
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </Box>

      {/* Mapa */}
      <MapContainer
        center={cascavelCenter}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Carto Light">
            <TileLayer
              attribution='&copy; OpenStreetMap & CartoDB'
              url="https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Carto Dark">
            <TileLayer
              attribution='&copy; OpenStreetMap & CartoDB'
              url="https://cartodb-basemaps-a.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        <ScaleControl position="bottomleft" />
        <Geocoder />
        
        {geojsonData && (
          <GeoJSON
            data={geojsonData}
            style={style as any}
            onEachFeature={onEachFeature as any}
          />
        )}

        {/* POIs (Hospitais e Escolas) */}
        {pois.filter(p => (p.type === 'hospital' && showHospitais) || (p.type === 'school' && showEscolas)).map((p, idx) => (
          <CircleMarker
            key={`${p.type}-${idx}`}
            center={[p.lat, p.lon]}
            radius={6}
            pathOptions={{ color: p.type === 'hospital' ? '#e02424' : '#0b7dda', fillColor: p.type === 'hospital' ? '#ff6b6b' : '#4dabf7', fillOpacity: 0.9 }}
          >
            <Popup>
              <div style={{ minWidth: 180 }}>
                <strong>{p.name || (p.type === 'hospital' ? 'Hospital' : 'Escola')}</strong>
                <div>Tipo: {p.type}</div>
              </div>
            </Popup>
          </CircleMarker>
        ))}

        {/* Overlay de calor simples com círculos proporcionais ao indicador (centro do bairro) */}
        {showHeat && geojsonData && (geojsonData.features || []).map((f: BairroFeature) => {
          const center = featureCentersRef.current[f.properties.id];
          const val = Number(f.properties[indicator] || 0);
          if (!center || !Number.isFinite(val)) return null;
          const t = indicatorStats.max === indicatorStats.min ? 0.5 : (val - indicatorStats.min) / (indicatorStats.max - indicatorStats.min);
          const radius = 8 + 16 * t; // 8 a 24
          const color = scaleColor(val);
          return (
            <CircleMarker
              key={`heat-${f.properties.id}`}
              center={center}
              radius={radius}
              pathOptions={{ color, fillColor: color, fillOpacity: 0.25, opacity: 0.35 }}
            />
          );
        })}
      </MapContainer>

      {/* Painel lateral de detalhes do bairro selecionado */}
      {selectedBairro && geojsonData && (
        (() => {
          const feat = (geojsonData.features as BairroFeature[]).find((x) => x.properties.id === selectedBairro);
          if (!feat) return null;
          const p = feat.properties as any;
          return (
            <Box sx={{ position: 'absolute', top: 100, right: 20, zIndex: 1002, backgroundColor: 'rgba(255,255,255,0.98)', p: 2, borderRadius: 2, boxShadow: 6, width: 320 }}>
              <Typography variant="h6" sx={{ mb: 1 }}>{p.nome}</Typography>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 8 }}>
                <div className="stat" style={{ padding: 12 }}>
                  <div className="stat-label">População</div>
                  <div className="value">{(p.populacao || 0).toLocaleString('pt-BR')}</div>
                </div>
                <div className="stat" style={{ padding: 12 }}>
                  <div className="stat-label">Empresas Ativas</div>
                  <div className="value">{(p.empresas_ativas || 0).toLocaleString('pt-BR')}</div>
                </div>
                <div className="stat" style={{ padding: 12 }}>
                  <div className="stat-label">Renda Média</div>
                  <div className="value">{p.renda_media ? `R$ ${(p.renda_media).toLocaleString('pt-BR')}` : '—'}</div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn-action" onClick={() => setSelectedBairro(null)}>Fechar</button>
                <button className="btn-action" onClick={() => { setBairroId(p.id); navigate('/relatorios'); }}>Ver Relatório</button>
                <button className="btn-action" onClick={() => setBairroId(p.id)}>Filtrar</button>
              </div>
            </Box>
          );
        })()
      )}
    </Paper>
  );
};

export default MapaInterativo;

