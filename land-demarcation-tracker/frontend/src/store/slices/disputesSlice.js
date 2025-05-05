// src/store/slices/disputesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api/api'
import { getUnresolvedDuplicatesUrl } from '../../api/url'

export const fetchUnresolved = createAsyncThunk(
  'disputes/fetchUnresolved',
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(getUnresolvedDuplicatesUrl())
      return res.data.data    // { duplicates, disputedPlots }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

const disputesSlice = createSlice({
  name: 'disputes',
  initialState: {
    duplicates:    [],
    disputedPlots: [],
    loading:       false,
    error:         null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchUnresolved.pending,   s => { s.loading = true;  s.error = null })
      .addCase(fetchUnresolved.fulfilled, (s, { payload }) => {
        s.loading       = false
        s.duplicates    = payload.duplicates
        s.disputedPlots = payload.disputedPlots
      })
      .addCase(fetchUnresolved.rejected,  (s, { payload }) => { s.loading = false; s.error = payload })
  }
})

export default disputesSlice.reducer
