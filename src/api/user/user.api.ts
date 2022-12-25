import { UserData } from '../admin/admin.api'
import { axios2 } from '../instances.api'

export const getUserInfo = (_id: string) => {
  return axios2.request<UserData>({
    url: `${process.env.REACT_APP_BACK_END}/user/user-info?id=${_id}`,
    method: 'get'
  })
}

export interface RegisterFingerParams {
  user_index: number
}

export const registerFinger = (params: RegisterFingerParams) => {
  return axios2.request({
    url: `${process.env.REACT_APP_BACK_END}/roll-call/register`,
    method: 'post',
    body: params
  })
}

export interface AttendaceData {
  user_id:string; 
  date:string;

}
export const getAttendanceTime = (_id: number) => {
  return axios2.request<AttendaceData[]>({
    url: `${process.env.REACT_APP_BACK_END}/roll-call/time?user_id=${_id}`,
    method: 'get'
  })
}
