import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'
export interface RequestOptions {
  url: string
  body?: any
  method: 'post' | 'get' | 'put' | 'delete'
}
export interface ResponseFormat<D> {
  code: number | string
  state: number
  data: D
  msg?:string
}
export interface ErrorResponse {
  message: string
  statusCode: number
}

export const handleError = (data: AxiosError<ErrorResponse>) => {
  const { response } = data

  toast(response?.data!.message || 'unexpect error', { type: 'error' })
}

export class axios2 {
  public static request<Data = any>(requestOptions: RequestOptions) {
    const token = Cookies.get('token')
    const { url, body, method } = requestOptions
    const requestConfig: AxiosRequestConfig = {
      method: method,
      url: url,
      data: body,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    return axios.request<ResponseFormat<Data>>(requestConfig).then((res) => res.data)
  }
}
export const axiosApiInstance = axios.create()
axiosApiInstance.interceptors.request.use(
  async (config) => {
    const token = Cookies.get('token')

    config.headers = {
      Authorization: `Bearer ${token}`,
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
      Authorization: `Bearer ${token}`,
    }
    return config
  },
  (error) => {
    Promise.reject(error)
    console.log(error)
    // add toast in here
  }
)
