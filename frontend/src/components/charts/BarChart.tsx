import React from 'react';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Paper, Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface BarChartProps {
  data: any[];
  title: string;
  dataKeys: Array<{ key: string; name: string; color?: string }>;
  xAxisKey?: string;
  height?: number;
}

const BarChart: React.FC<BarChartProps> = ({
  data,
  title,
  dataKeys,
  xAxisKey = 'nome',
  height = 300,
}) => {
  const theme = useTheme();

  const defaultColors = [
    theme.palette.primary.main,
    theme.palette.secondary.main,
    theme.palette.success.main,
    theme.palette.warning.main,
  ];

  return (
    <Paper sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom fontWeight={600}>
        {title}
      </Typography>
      <Box sx={{ width: '100%', height }}>
        <ResponsiveContainer>
          <RechartsBarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis
              dataKey={xAxisKey}
              tick={{ fontSize: 12 }}
              stroke={theme.palette.text.secondary}
            />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke={theme.palette.text.secondary}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: `1px solid ${theme.palette.divider}`,
                borderRadius: 8,
              }}
            />
            <Legend />
            {dataKeys.map((item, index) => (
              <Bar
                key={item.key}
                dataKey={item.key}
                name={item.name}
                fill={item.color || defaultColors[index % defaultColors.length]}
                radius={[8, 8, 0, 0]}
              />
            ))}
          </RechartsBarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
};

export default BarChart;



