import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { getRoomInfo, LedData } from '../../api/dashboard/dashboard.apt'
import { handleError } from '../../api/instances.api'
import FlipClockCountdown from '@leenguyen/react-flip-clock-countdown'
import '@leenguyen/react-flip-clock-countdown/dist/index.css'
export const socket = io(`${process.env.REACT_APP_BACK_END}`)

export default function Dashboard() {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [lastPong, setLastPong] = useState<string | null>(null)
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

    socket.on('pong', () => {
      setLastPong(new Date().toISOString())
    })

    socket.on('room_sensor', (data) => {
      console.log(data)
    })
    socket.on('user_amount', async () => {
      const data = await getRoomInfo()
      console.log(data)
    })
    return () => {
      socket.off('room_sensor')
      socket.off('connect')
      socket.off('disconnect')
      socket.off('pong')
      socket.off('user_amount')
    }
  }, [])
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  // add a day
  date.setDate(date.getDate() + 1)
  return (
    <div className="p-2">
      <h2 className="text-lg text-gray-900  dark:text-white font-semibold"> Dashboard Page</h2>
      <p>Room current infomation</p>
      <div className="grid grid-cols-10 ">
        <div className="col-span-10 grid grid-cols-2 grid-rows-2 gap-5">
          <div className="shadow-2xl bg-white rounded-lg ">
            <div className="text-center w-full text-md font-medium text-gray-900 dark:text-gray-300">
              Nhiệt độ
            </div>
            <div> {temp}</div>
          </div>
          <div className="shadow-2xl bg-white rounded-lg">
            <div className="text-center w-full text-md font-medium text-gray-900 dark:text-gray-300">
              Độ Ẩm
            </div>
            <div>{humidity}</div>
          </div>
          <div className="shadow-2xl bg-white rounded-lg">
            <div className="text-center w-full text-md font-medium text-gray-900 dark:text-gray-300">
              Đèn
            </div>
            {leds?.map((items) => {
              return <div key={items.led_number}>{`${items.led_number} : ${items.state}`}</div>
            })}
          </div>
          <div className="shadow-2xl bg-white rounded-lg">
            <div className="text-center w-full text-md font-medium text-gray-900 dark:text-gray-300">
              Số người
            </div>
            <div>{amountUsers}</div>
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
