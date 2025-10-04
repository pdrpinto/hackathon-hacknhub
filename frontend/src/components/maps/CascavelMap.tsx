import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { mapasAPI } from '../../services/api';
import { BairroData } from '../../types/indicadores';
import { formatNumber } from '../../utils/formatters';

// Fix para ícones do Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface CascavelMapProps {
  height?: string | number;
  indicador?: string;
  showBairros?: boolean;
}

const MapUpdater: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
};

const CascavelMap: React.FC<CascavelMapProps> = ({
  height = 500,
  indicador = 'populacao',
  showBairros = true,
}) => {
  const [bairros, setBairros] = useState<BairroData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Coordenadas do centro de Cascavel
  const cascavelCenter: [number, number] = [-24.9555, -53.4552];
  const defaultZoom = 12;

  useEffect(() => {
    const fetchBairros = async () => {
      try {
        setLoading(true);
        const response = await mapasAPI.getBairros();
        setBairros(response.data);
        setError(null);
      } catch (err) {
        console.error('Erro ao carregar bairros:', err);
        setError('Erro ao carregar dados do mapa');
      } finally {
        setLoading(false);
      }
    };

    if (showBairros) {
      fetchBairros();
    } else {
      setLoading(false);
    }
  }, [showBairros]);

  const getMarkerColor = (populacao: number) => {
    if (populacao > 20000) return '#f44336'; // Vermelho - Alta
    if (populacao > 15000) return '#ff9800'; // Laranja - Média-Alta
    if (populacao > 10000) return '#ffc107'; // Amarelo - Média
    return '#4caf50'; // Verde - Baixa
  };

  const createCustomIcon = (populacao: number) => {
    const color = getMarkerColor(populacao);
    const html = `
      <div style="
        background-color: ${color};
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
        font-size: 10px;
      ">
        ${(populacao / 1000).toFixed(0)}K
      </div>
    `;

    return L.divIcon({
      html,
      className: 'custom-marker',
      iconSize: [30, 30],
      iconAnchor: [15, 15],
    });
  };

  if (loading) {
    return (
      <Paper
        sx={{
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Carregando mapa...</Typography>
        </Box>
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper
        sx={{
          height,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 3,
        }}
      >
        <Typography color="error">{error}</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ height, position: 'relative', overflow: 'hidden' }}>
      <MapContainer
        center={cascavelCenter}
        zoom={defaultZoom}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <MapUpdater center={cascavelCenter} zoom={defaultZoom} />
        
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {showBairros &&
          bairros.map((bairro) => (
            <Marker
              key={bairro.id}
              position={[bairro.latitude, bairro.longitude]}
              icon={createCustomIcon(bairro.populacao_estimada)}
            >
              <Popup>
                <Box sx={{ minWidth: 200 }}>
                  <Typography variant="h6" gutterBottom fontWeight={600}>
                    {bairro.nome}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        População:
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {formatNumber(bairro.populacao_estimada)}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Área:
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {bairro.area_km2.toFixed(2)} km²
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Densidade:
                      </Typography>
                      <Typography variant="body2" fontWeight={600}>
                        {(bairro.populacao_estimada / bairro.area_km2).toFixed(0)} hab/km²
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      {/* Legenda */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: 'white',
          p: 2,
          borderRadius: 2,
          boxShadow: 3,
          zIndex: 1000,
        }}
      >
        <Typography variant="subtitle2" gutterBottom fontWeight={600}>
          População por Bairro
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: '#f44336',
              }}
            />
            <Typography variant="caption">&gt; 20.000</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: '#ff9800',
              }}
            />
            <Typography variant="caption">15.000 - 20.000</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: '#ffc107',
              }}
            />
            <Typography variant="caption">10.000 - 15.000</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box
              sx={{
                width: 16,
                height: 16,
                borderRadius: '50%',
                backgroundColor: '#4caf50',
              }}
            />
            <Typography variant="caption">&lt; 10.000</Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default CascavelMap;


