import { Button } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { TbBulb, TbBulbOff, TbLamp } from 'react-icons/tb'
import { ControllerLed, getUsers, UserData } from '../../api/admin/admin.api'
import { getRoomInfo, LedData, LedStatus } from '../../api/dashboard/dashboard.apt'
import { handleError } from '../../api/instances.api'

export default function Admin() {
  const [users, setUsers] = useState<UserData[]>()
  const [leds, setLeds] = useState<LedData[]>()

  const handleControllLed = async (state: LedStatus, led_number: number) => {
    const oppositeState = state === 'ON' ? LedStatus.OFF : LedStatus.ON
    try {
      await ControllerLed({ led_number: led_number, state: oppositeState })
      getLeds()
    } catch (error) {
      handleError(error as any)
    }
  }
  const getAlluser = async () => {
    try {
      const data = await getUsers()
      setUsers(data.data)
    } catch (error) {
      handleError(error as any)
    }
  }
  const getLeds = async () => {
    try {
      const roomInfo = await getRoomInfo()
      setLeds(roomInfo.data[0].leds)
    } catch (error) {
      handleError(error as any)
    }
  }
  useEffect(() => {
    getLeds()
    getAlluser()
  }, [])

  return (
    <div className="">
      <h2 className="text-lg text-gray-900  dark:text-white font-semibold">Admin Page</h2>
      <p className="text-sm text-gray-500 mb-5">Admin page to controll device</p>
      <div className="mb-5 ">
        <h2 className="text-md text-gray-900 font-semibold">Controll Led</h2>
        <div className="p-2"></div>
        <div className='flex'>
          {leds?.map((items) => {
            return (
              <div key={items.led_number}>
                <div className="flex items-center mr-2 ">
                  <TbLamp size={40} />
                  <div className="text-3xl">{items.led_number} :</div>
                  <div>{items.state === 'ON' ? <TbBulb size={40} /> : <TbBulbOff size={40} />}</div>
                  <Button onClick={() => handleControllLed(items.state, items.led_number)}>
                    {items.state === 'ON' ? 'OFF' : 'ON'}
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div>
        <h2 className="text-md text-gray-900 font-semibold mb-3">Controll Users</h2>
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                UserName
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Register Online
              </th>
              <th scope="col" className="py-3 px-6">
                Register Offline
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => {
              const { name, username, finger_register, can_use_finger } = user
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                  <td
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {name}
                  </td>
                  <td className="py-4 px-6">{username}</td>
                  <td className="py-4 px-6">{finger_register ? 'True' : 'False'}</td>
                  <td className="py-4 px-6">{can_use_finger ? 'True' : 'False'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
