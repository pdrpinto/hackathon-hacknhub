import React from 'react';
import {
  Alert,
  AlertTitle,
  Box,
  Chip,
  IconButton,
  Collapse,
} from '@mui/material';
import {
  Warning,
  Error,
  Info,
  Close,
} from '@mui/icons-material';
import { AlertaData } from '../../types/indicadores';
import { formatDateTime, getSeverityColor } from '../../utils/formatters';

interface AlertBadgeProps {
  alerta: AlertaData;
  onClose?: () => void;
}

const AlertBadge: React.FC<AlertBadgeProps> = ({ alerta, onClose }) => {
  const [open, setOpen] = React.useState(true);

  const getSeverityIcon = () => {
    switch (alerta.severidade) {
      case 'alta':
        return <Error />;
      case 'media':
        return <Warning />;
      case 'baixa':
        return <Info />;
      default:
        return <Info />;
    }
  };

  const getSeverityLevel = (): 'error' | 'warning' | 'info' | 'success' => {
    switch (alerta.severidade) {
      case 'alta':
        return 'error';
      case 'media':
        return 'warning';
      case 'baixa':
        return 'info';
      default:
        return 'info';
    }
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) {
      setTimeout(onClose, 300);
    }
  };

  return (
    <Collapse in={open}>
      <Alert
        severity={getSeverityLevel()}
        icon={getSeverityIcon()}
        action={
          onClose && (
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={handleClose}
            >
              <Close fontSize="inherit" />
            </IconButton>
          )
        }
        sx={{
          mb: 2,
          borderRadius: 2,
          boxShadow: 2,
        }}
      >
        <AlertTitle sx={{ fontWeight: 600 }}>
          {alerta.titulo}
        </AlertTitle>
        
        <Box sx={{ mb: 1 }}>
          <Chip
            label={alerta.area}
            size="small"
            sx={{
              mr: 1,
              backgroundColor: getSeverityColor(alerta.severidade) + '20',
              color: getSeverityColor(alerta.severidade),
            }}
          />
          <Chip
            label={alerta.status}
            size="small"
            variant="outlined"
          />
        </Box>

        <Box sx={{ mt: 1, fontSize: '0.875rem' }}>
          <strong>Ação Recomendada:</strong> {alerta.acao_recomendada}
        </Box>

        <Box sx={{ mt: 1, fontSize: '0.75rem', color: 'text.secondary' }}>
          Criado em: {formatDateTime(alerta.criado_em)}
        </Box>
      </Alert>
    </Collapse>
  );
};

export default AlertBadge;


