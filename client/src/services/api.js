import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL.replace(/\/+$/, '')}/api`
  : '/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor: attach bearer token if stored in local storage / session
api.interceptors.request.use(
  (config) => {
    try {
      const authData = localStorage.getItem('saradhya-auth')
      if (authData) {
        const parsed = JSON.parse(authData)
        if (parsed?.state?.token) {
          config.headers.Authorization = `Bearer ${parsed.state.token}`
        }
      }
    } catch {
      // Ignore storage read error
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor: graceful error unwrapping
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.error ||
      error.response?.data?.message ||
      error.message ||
      'An unexpected error occurred'
    return Promise.reject(new Error(message))
  }
)

export default api
