import axios from 'axios'
import Cookies from 'js-cookie'

export const axiosApiInstance = axios.create()
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const token = Cookies.get('token')

    config.headers = {
      Authorization: `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.log(error)
    Promise.reject(error)
  }
)
axiosApiInstance.interceptors.response.use(
  async (config) => {
    const token = Cookies.get('token')

    config.headers = {
      Authorization: `Bearer ${token}`
    }
    return config
  },
  (error) => {
    Promise.reject(error)
    console.log(error)
    // add toast in here
  }
)
