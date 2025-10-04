import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Popup, useMap } from 'react-leaflet';
import { Box, Paper, Typography, CircularProgress, Chip, Stack } from '@mui/material';
import L, { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

// Fix Leaflet default icon paths
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Feature, GeoJsonProperties, Geometry } from 'geojson';

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
  const [geojsonData, setGeojsonData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBairro, setSelectedBairro] = useState<number | null>(null);

  // Centro de Cascavel, PR
  const cascavelCenter: LatLngExpression = [-24.955, -53.455];

  useEffect(() => {
    fetchMapData();
  }, []);

  const fetchMapData = async () => {
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

  const style = (feature?: BairroFeature) => {
    if (!feature) return {};
    
    const isSelected = selectedBairro === feature.properties.id;
    const cor = feature.properties.cor || getColorByRegiao(feature.properties.regiao);
    
    return {
      fillColor: cor,
      weight: isSelected ? 3 : 1.5,
      opacity: 1,
      color: isSelected ? '#FFD700' : '#ffffff',
      dashArray: '',
      fillOpacity: isSelected ? 0.8 : 0.6
    };
  };

  const onEachFeature = (feature: BairroFeature, layer: L.Layer) => {
    const props = feature.properties;
    
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
      </Box>

      {/* Mapa */}
      <MapContainer
        center={cascavelCenter}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {geojsonData && (
          <GeoJSON
            data={geojsonData}
            style={style as any}
            onEachFeature={onEachFeature as any}
          />
        )}
      </MapContainer>
    </Paper>
  );
};

export default MapaInterativo;

