import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { dashboardSummaryUrl } from '../../api/url'
import api from '../../api/api'

// Async thunk to fetch summary
export const fetchDashboardSummary = createAsyncThunk(
  'dashboard/fetchSummary',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(dashboardSummaryUrl())
      // our ApiResponse wraps payload under `data`
      return res.data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    summary: null,     // will hold { totalPlots, pending, resolved, disputed, duplicateCount, byCircle, byOfficer }
    loading: false,
    error:   null,
  },
  reducers: {
    clearDashboard(state) {
      state.summary = null
      state.error   = null
      state.loading = false
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardSummary.pending, (state) => {
        state.loading = true
        state.error   = null
      })
      .addCase(fetchDashboardSummary.fulfilled, (state, action) => {
        state.loading = false
        state.summary = action.payload
      })
      .addCase(fetchDashboardSummary.rejected, (state, action) => {
        state.loading = false
        state.error   = action.payload
      })
  }
})

export const { clearDashboard } = dashboardSlice.actions
export default dashboardSlice.reducer
