import axios from 'axios'
import { toast } from 'react-toastify'
import { getUserUrl } from './url'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  withCredentials: true,
})

api.interceptors.response.use(
  response => response,
  error => {

    const { response, config } = error

    // 1) Server responded with a status outside 2xx
    if (error.response) {
      const { status, data } = response
      const url = config.url || ''

      if ((status === 401 || status === 403) && !url.endsWith(getUserUrl())) {
        setTimeout(() => {
          window.location.href = '/login' // Redirect to login page
        }, 1000);
      } else if (!url.includes(getUserUrl())) {
        const msg = data?.message || data?.error || error.response.statusText
        toast.error(msg)
      }

    // 2) Request was sent but no response received
    } else if (error.request) {
      console.error('No response received:', error.request)
      toast.error('No response from server. Please check your network or try again later.')

    // 3) Something went wrong setting up the request
    } else {
      console.error('Axios error:', error.message)
      toast.error(`Error: ${error.message}`)
    }

    return Promise.reject(error)
  }
)

export default api
