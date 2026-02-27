// src/store/slices/plotsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'
import { getAllPlotsUrl, registerPlotUrl, updatePlotUrl } from '../../api/url'

// Fetch paginated plots (accepts { status, page, limit })
export const fetchPlots = createAsyncThunk(
  'plots/fetch',
  async ({ status, page, limit }, { rejectWithValue }) => {
    try {
      const res = await api.get(getAllPlotsUrl(), { params: { status, page, limit } })
      // res.data.data = { plots, pagination }
      return res.data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// Register a new plot (admin only)
export const registerPlot = createAsyncThunk(
  'plots/register',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.post(registerPlotUrl(), payload)
      return res.data.data  // the created plot
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// Update a plot status (officer only)
export const updatePlot = createAsyncThunk(
  'plots/update',
  async (payload, { rejectWithValue }) => {
    try {
      const res = await api.patch(updatePlotUrl(), payload)
      return payload  // { plot_id, status, remarks }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

const plotsSlice = createSlice({
  name: 'plots',
  initialState: {
    plots:       [],
    pagination:  { page: 1, limit: 10, total: 0, pages: 0 },
    loading:     false,
    error:       null,
  },
  reducers: {
    setPage: (state, action) => { state.pagination.page = action.payload },
    setStatusFilter: (state, action) => { state.statusFilter = action.payload },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPlots.pending,   s => { s.loading = true;  s.error = null })
      .addCase(fetchPlots.fulfilled, (s, { payload }) => {
        s.loading       = false
        s.plots         = payload.plots
        s.pagination    = payload.pagination
      })
      .addCase(fetchPlots.rejected,  (s, { payload }) => { s.loading = false; s.error = payload })

      .addCase(registerPlot.pending,   s => { s.error = null })
      .addCase(registerPlot.fulfilled, (s, { payload }) => {
        // prepend new plot
        s.plots.unshift(payload)
      })
      .addCase(registerPlot.rejected,  (s, { payload }) => { s.error = payload })

      .addCase(updatePlot.pending,   s => { s.error = null })
      .addCase(updatePlot.fulfilled, (s, { payload }) => {
        // update local copy
        const idx = s.plots.findIndex(p => p.id === payload.plot_id)
        if (idx !== -1) s.plots[idx].status = payload.status
      })
      .addCase(updatePlot.rejected,  (s, { payload }) => { s.error = payload })
  }
})

export const { setPage, setStatusFilter } = plotsSlice.actions
export default plotsSlice.reducer
