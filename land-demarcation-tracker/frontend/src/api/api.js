// src/api/api.js
import axios from 'axios'
import { toast } from 'react-toastify'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true, // ⚠️ important for cookies
})

// Global error handler
api.interceptors.response.use(
  response => response,
  error => {
    const { response } = error
    if (response) {
      const { status, data } = response

      // 401 / 403 → session expired
      if (status === 401 || status === 403) {
        toast.error('Session expired. Please log in again.')
        // Redirect to login (cookies will be ignored afterward)
        window.location.href = '/login'
      } else {
        // other API errors
        const msg = data?.message || response.statusText
        toast.error(msg)
      }
    } else {
      // network / CORS / timeout
      toast.error('Network error. Check your connection.')
    }
    return Promise.reject(error)
  }
)

export default api
