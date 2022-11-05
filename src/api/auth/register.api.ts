import { RegisterParams } from '../../types/login/register.type'
import { axiosApiInstance } from '../instances.api'

export const register = async (params: RegisterParams) => {
  console.log(process.env.REACT_APP_BACK_END)
  try {
    return axiosApiInstance.post(`${process.env.REACT_APP_BACK_END}/auth/register`, { ...params })
  } catch (error) {
    console.log(error)
  }
}
