import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {
  setTimeRange,
  setPerformanceData,
  setUsageData,
  setEngagementData,
} from '../store/slices/analyticsSlice';
import { SelectChangeEvent } from '@mui/material/Select';

const AnalyticsDashboard: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { performance, usage, engagement, timeRange } = useSelector(
    (state: RootState) => state.analytics
  );

  const handleTimeRangeChange = (event: SelectChangeEvent<string>) => {
    dispatch(setTimeRange(event.target.value));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5">{t('analytics.title')}</Typography>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>{t('analytics.timeRange')}</InputLabel>
          <Select
            value={timeRange}
            onChange={handleTimeRangeChange}
            label={t('analytics.timeRange')}
          >
            <MenuItem value="day">{t('analytics.day')}</MenuItem>
            <MenuItem value="week">{t('analytics.week')}</MenuItem>
            <MenuItem value="month">{t('analytics.month')}</MenuItem>
            <MenuItem value="year">{t('analytics.year')}</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {t('analytics.performance')}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performance.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#8884d8"
                  name={t('analytics.performance')}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {t('analytics.usage')}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={usage.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#82ca9d"
                  name={t('analytics.usage')}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              {t('analytics.engagement')}
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagement.data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#ffc658"
                  name={t('analytics.engagement')}
                />
              </LineChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalyticsDashboard; 