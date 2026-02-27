import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'
import { getDemarcationLogsUrl } from '../../api/url'

export const fetchLogs = createAsyncThunk(
  'demarcation/fetchLogs',
  async ({ page = 1, limit = 10 }, { rejectWithValue }) => {
    try {
      const res = await api.get(getDemarcationLogsUrl(), {
        params: { page, limit }
      })
      return res.data.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

const demarcationSlice = createSlice({
  name: 'demarcation',
  initialState: {
    logs:       [],
    pagination: { page: 1, limit: 10, total: 0, pages: 0 },
    loading:    false,
    error:      null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchLogs.pending,   s => { s.loading = true;  s.error = null })
      .addCase(fetchLogs.fulfilled, (s, { payload }) => {
        s.loading    = false
        s.logs       = payload.logs
        s.pagination = payload.pagination
      })
      .addCase(fetchLogs.rejected,  (s, { payload }) => { s.loading = false; s.error = payload })
  }
})

export default demarcationSlice.reducer