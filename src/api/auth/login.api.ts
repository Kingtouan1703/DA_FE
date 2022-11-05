import axios from 'axios'
import { LoginParams } from '../../types/login/login.type'
import { axiosApiInstance } from '../instances.api'

export function login(params: LoginParams) {
  try {
    return axios.post(`${process.env.REACT_APP_BACK_END}/auth/login`, {
      username: params.username,
      password: params.password
    })
  } catch (error) {
    console.log(error)
  }
}
export function test() {
  try {
    const data = axiosApiInstance.get('http://localhost:8080/auth/profile')
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}
