import FullCalendar from '@fullcalendar/react'
import React, { useEffect, useState } from 'react'
import {
  AttendaceData,
  getAttendanceTime,
  getUserInfo,
  registerFinger
} from '../../api/user/user.api'
import useUserStore from '../../store/user.store'
import dayGridPlugin from '@fullcalendar/daygrid'
import './calender.css'
import { Button } from 'flowbite-react'
import { handleError } from '../../api/instances.api'
import { toast } from 'react-toastify'
export default function Attendance() {
  const { userDetail, user_id, setUserDetai } = useUserStore()
  const [attendance, setAttendance] = useState<AttendaceData[]>()
  const [calander, setCalander] = useState<{ title: string; date: string }[]>()

  const attendanceCalender = (data: AttendaceData[]) => {
    // const
    const newdata = data.map((item) => {
      const newDate = new Date(item.date)
      var month = newDate.getUTCMonth() + 1
      var day = ('0' + newDate.getUTCDate()).slice(-2)
      var year = newDate.getUTCFullYear()
      return { title: 'Attendance', date: `${year}-${month}-${day}` }
    })
    setCalander(newdata)
  }
  const userAttendanceTime = async () => {
    const data = await getAttendanceTime(user_id)
    attendanceCalender(data.data)
    setAttendance(data.data)
  }
  console.log(calander)
  const getUserDetail = async () => {
    if (user_id === '') return
    try {
      const user = await getUserInfo(user_id)
      console.log(user)
      setUserDetai(user.data)
    } catch (error) {}
  }
  const registerOnline = async () => {
    try {
      const res = await registerFinger({ user_id })
      console.log(res)
      getUserDetail()
      toast('register success')
    } catch (error) {
      handleError(error as any)
    }
  }
  useEffect(() => {
    userAttendanceTime()
    getUserDetail()
  }, [])

  return (
    <div className="p-2">
      <h2 className="text-lg text-gray-900  dark:text-white font-semibold">Attendace Calendar</h2>
      <p className="text-sm text-gray-500 mb-5">You should go to gyms oftenly</p>
      {userDetail && (
        <div className="h-4/6">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            weekends={true}
            events={calander}
            height={600}
          />
          <div className="text-md font-semibold">
            FingerPrint Register Onine :{userDetail.finger_register ? 'True' : 'False'}
          </div>
          <div className="text-md font-semibold">
            FingerPrint Register Offline :{userDetail.can_use_finger ? 'True' : 'False'}
          </div>
          <div className="text-md font-semibold"> Attendance: {attendance?.length}</div>
          {!userDetail?.finger_register && (
            <Button onClick={registerOnline}> Register to tracking your workout</Button>
          )}
        </div>
      )}
    </div>
  )
}
