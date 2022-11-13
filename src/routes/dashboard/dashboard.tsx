import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { getRoomInfo, LedData } from '../../api/dashboard/dashboard.apt'
import { handleError } from '../../api/instances.api'
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css'
import { FaTemperatureHigh } from 'react-icons/fa'
import { WiHumidity } from 'react-icons/wi'
import { TbLamp, TbBulb, TbBulbOff } from 'react-icons/tb'
import { SlPeople } from 'react-icons/sl'
export const socket = io(`${process.env.REACT_APP_BACK_END}`)

interface RoomSensorPayload {
  temp: string, hum: string
}

export default function Dashboard() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [temp, setTemp] = useState<number>()
  const [amountUsers, setAmountUsers] = useState<number>()
  const [humidity, setHumidity] = useState<number>()
  const [leds, setLeds] = useState<LedData[]>()
  const getRoomdata = async () => {
    try {
      const roomInfo = await getRoomInfo()
      const data = roomInfo.data[0]
      setHumidity(data.humidity)
      setAmountUsers(data.amount_gymers)
      setTemp(data.temperature)
      setLeds(data.leds)
    } catch (error) {
      handleError(error as any)
    }
  }
  
  useEffect(() => {
    getRoomdata()
  }, [])

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })
    socket.on('led_change'  , (data : LedData[]) => {
      setLeds(data)
    })
    socket.on('abc'  , (data : LedData[]) => {
      console.log(data)
    })

    socket.on('room_sensor', (data :RoomSensorPayload) => {
      setHumidity(+data.hum)
      setTemp(+data.temp)
    })
    socket.on('user_amount', async () => {
      const roomInfo = await getRoomInfo()
      const data = roomInfo.data[0]
      setAmountUsers(data.amount_gymers)
    })
    return () => {
      socket.off('room_sensor')
      socket.off('connect')
      socket.off('disconnect')
      socket.off('user_amount')
      socket.off('led_change ')
    }
  }, [])
  console.log(socket)
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  date.setDate(date.getDate() + 1)
  return (
    <div className="p-2">
      <h2 className="text-lg text-gray-900  dark:text-white font-semibold"> Dashboard Page</h2>
      <p className='text-sm text-gray-500 mb-5'>Room current infomation</p>
      <div className="grid grid-cols-10 ">
        <div className="col-span-10 grid grid-cols-2 grid-rows-2 gap-5">
          <div className="shadow-2xl bg-white rounded-lg ">
            <div className="text-center w-full text-md font-medium text-gray-900 dark:text-gray-300">
              Nhiệt độ
            </div>
            <div className="p-5 flex justify-center items-center">
              <div className="text-3xl ">
                {temp} <span className="mr-2">&#8451;</span>
              </div>
              <FaTemperatureHigh size={28} />
            </div>
          </div>
          <div className="shadow-2xl bg-white rounded-lg">
            <div className="text-center w-full text-md font-medium text-gray-900 dark:text-gray-300">
              Độ Ẩm
            </div>
            <div className="p-5 flex justify-center items-center">
              <div className="text-3xl">{humidity} </div>
              <WiHumidity size={40}></WiHumidity>
            </div>
          </div>
          <div className="shadow-2xl bg-white rounded-lg">
            <div className="text-center w-full text-md font-medium text-gray-900 dark:text-gray-300">
              Đèn
            </div>
            <div className='p-5'>
              {leds?.map((items) => {
                return (
                  <div key={items.led_number}>
                    <div className="flex items-center justify-center">
                      <TbLamp size={40} />
                      <div className='text-3xl'>{items.led_number} :</div>
                      <div>{items.state === 'ON' ? <TbBulb size={40}/> : <TbBulbOff size={40}/>}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="shadow-2xl bg-white rounded-lg">
            <div className="text-center w-full text-md font-medium text-gray-900 dark:text-gray-300">
              Số người
            </div>
            <div className="p-5 flex justify-center items-center">
              <div className="text-3xl ">{amountUsers} </div>
              <SlPeople size={30}></SlPeople>
            </div>
          </div>
        </div>
        <div className=" w-full p-5 col-span-10 ">
          <div className=" rounded-lg ">
            <div className="text-center w-full text-md font-medium text-gray-900 dark:text-gray-300">
              Time
            </div>
            <FlipClockCountdown
              to={date.getTime()}
              className=" justify-center"
              labels={['DAYS', 'HOURS', 'MINUTES', 'SECONDS']}
              labelStyle={{
                fontSize: 10,
                fontWeight: 500,
                textTransform: 'uppercase',
                color: 'black'
              }}
              digitBlockStyle={{ width: 40, height: 60, fontSize: 30 }}
              dividerStyle={{ color: 'white', height: 1 }}
              separatorStyle={{ color: 'red', size: '6px' }}
              duration={0.5}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
