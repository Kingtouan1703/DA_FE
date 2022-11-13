import { LedStatus } from '../dashboard/dashboard.apt'
import { axios2 } from '../instances.api'

export interface LedQuery {
  state: LedStatus
  led_number: number
}

export const ControllerLed = (query: LedQuery) => {
  return axios2.request({
    url: `${process.env.REACT_APP_BACK_END}/room/controll-led?led_number=${query.led_number}&state=${query.state}`,
    method: 'get'
  })
}

export enum Role {
  ADMIN = 'admin',
  USER = 'user'
}

export interface UserData {
  username: string
  name: string
  finger_register: boolean | null
  can_use_finger: boolean | null
  roles: Role[] | []
}

export const getUsers = () => {
  return axios2.request<UserData[]>({
    url: `${process.env.REACT_APP_BACK_END}/user`,
    method: 'get'
  })
}
