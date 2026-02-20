import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AnalyticsData {
  date: string;
  value: number;
}

interface AnalyticsState {
  performance: {
    data: AnalyticsData[];
    loading: boolean;
    error: string | null;
  };
  usage: {
    data: AnalyticsData[];
    loading: boolean;
    error: string | null;
  };
  engagement: {
    data: AnalyticsData[];
    loading: boolean;
    error: string | null;
  };
  timeRange: 'day' | 'week' | 'month' | 'year';
}

const initialState: AnalyticsState = {
  performance: {
    data: [],
    loading: false,
    error: null,
  },
  usage: {
    data: [],
    loading: false,
    error: null,
  },
  engagement: {
    data: [],
    loading: false,
    error: null,
  },
  timeRange: 'week',
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setPerformanceData: (state: AnalyticsState, action: PayloadAction<AnalyticsData[]>) => {
      state.performance.data = action.payload;
    },
    setUsageData: (state: AnalyticsState, action: PayloadAction<AnalyticsData[]>) => {
      state.usage.data = action.payload;
    },
    setEngagementData: (state: AnalyticsState, action: PayloadAction<AnalyticsData[]>) => {
      state.engagement.data = action.payload;
    },
    setTimeRange: (state: AnalyticsState, action: PayloadAction<AnalyticsState['timeRange']>) => {
      state.timeRange = action.payload;
    },
    setLoading: (
      state: AnalyticsState,
      action: PayloadAction<{ type: keyof Omit<AnalyticsState, 'timeRange'>; loading: boolean }>
    ) => {
      state[action.payload.type].loading = action.payload.loading;
    },
    setError: (
      state: AnalyticsState,
      action: PayloadAction<{ type: keyof Omit<AnalyticsState, 'timeRange'>; error: string | null }>
    ) => {
      state[action.payload.type].error = action.payload.error;
    },
  },
});

export const {
  setPerformanceData,
  setUsageData,
  setEngagementData,
  setTimeRange,
  setLoading,
  setError,
} = analyticsSlice.actions;

export default analyticsSlice.reducer; 