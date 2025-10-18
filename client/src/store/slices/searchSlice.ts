import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TrainingModule } from '../../types/training';

interface SearchState {
  query: string;
  results: TrainingModule[];
  filters: {
    language: string;
    level: string;
    category: string;
  };
  loading: boolean;
  error: string | null;
  voiceInput: boolean;
}

const initialState: SearchState = {
  query: '',
  results: [],
  filters: {
    language: 'en',
    level: 'all',
    category: 'all',
  },
  loading: false,
  error: null,
  voiceInput: false,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setResults: (state, action: PayloadAction<TrainingModule[]>) => {
      state.results = action.payload;
    },
    setFilters: (state, action: PayloadAction<SearchState['filters']>) => {
      state.filters = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    toggleVoiceInput: (state) => {
      state.voiceInput = !state.voiceInput;
    },
  },
});

export const {
  setQuery,
  setResults,
  setFilters,
  setLoading,
  setError,
  toggleVoiceInput,
} = searchSlice.actions;

export default searchSlice.reducer; 