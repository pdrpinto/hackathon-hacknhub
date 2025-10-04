import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  useTheme,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  TrendingFlat,
} from '@mui/icons-material';
import { formatNumber, formatPercent } from '../../utils/formatters';

interface KPICardProps {
  title: string;
  value: number | string;
  subtitle?: string;
  variacao?: number;
  tendencia?: 'alta' | 'baixa' | 'estavel';
  icon?: React.ReactNode;
  color?: string;
  formato?: 'numero' | 'percentual' | 'moeda' | 'texto';
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  subtitle,
  variacao,
  tendencia,
  icon,
  color,
  formato = 'numero',
}) => {
  const theme = useTheme();

  const getTrendIcon = () => {
    if (!tendencia) return null;
    switch (tendencia) {
      case 'alta':
        return <TrendingUp fontSize="small" />;
      case 'baixa':
        return <TrendingDown fontSize="small" />;
      case 'estavel':
        return <TrendingFlat fontSize="small" />;
    }
  };

  const getTrendColor = () => {
    if (!tendencia) return theme.palette.grey[500];
    switch (tendencia) {
      case 'alta':
        return theme.palette.success.main;
      case 'baixa':
        return theme.palette.error.main;
      case 'estavel':
        return theme.palette.warning.main;
    }
  };

  const formatValue = () => {
    if (typeof value === 'string') return value;
    switch (formato) {
      case 'numero':
        return formatNumber(value);
      case 'percentual':
        return formatPercent(value);
      case 'moeda':
        return `R$ ${formatNumber(value)}`;
      default:
        return value;
    }
  };

  return (
    <Card
      sx={{
        height: '100%',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[8],
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography
            variant="subtitle2"
            color="text.secondary"
            fontWeight={500}
            sx={{ textTransform: 'uppercase', letterSpacing: 0.5 }}
          >
            {title}
          </Typography>
          {icon && (
            <Box
              sx={{
                backgroundColor: color ? `${color}15` : `${theme.palette.primary.main}15`,
                borderRadius: 2,
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: color || theme.palette.primary.main,
              }}
            >
              {icon}
            </Box>
          )}
        </Box>

        <Typography
          variant="h4"
          component="div"
          fontWeight={700}
          gutterBottom
          sx={{ color: color || theme.palette.primary.main }}
        >
          {formatValue()}
        </Typography>

        {subtitle && (
          <Typography variant="body2" color="text.secondary" gutterBottom>
            {subtitle}
          </Typography>
        )}

        {(variacao !== undefined || tendencia) && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
            {variacao !== undefined && (
              <Chip
                icon={getTrendIcon() || undefined}
                label={`${variacao > 0 ? '+' : ''}${variacao.toFixed(2)}%`}
                size="small"
                sx={{
                  backgroundColor: `${getTrendColor()}20`,
                  color: getTrendColor(),
                  fontWeight: 600,
                }}
              />
            )}
            <Typography variant="caption" color="text.secondary">
              vs. período anterior
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default KPICard;



