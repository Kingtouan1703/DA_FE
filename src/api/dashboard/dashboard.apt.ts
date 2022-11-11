import { axios2 } from '../instances.api'

export enum LedStatus {
  ON = 'ON',
  OFF = 'OFF'
}

export interface LedData {
  led_number: number
  state: LedStatus
}

export interface RoomData {
  _id: string
  name: string
  leds: LedData[]
  humidity: number
  temperature: number
  amount_gymers: number
}

export const getRoomInfo = () => {
  return axios2.request<RoomData[]>({
    url: `${process.env.REACT_APP_BACK_END}/room/room-info`,
    method: 'get'
  })
}
