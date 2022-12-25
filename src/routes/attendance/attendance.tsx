import FullCalendar from '@fullcalendar/react'
import { useEffect, useState } from 'react'
import { AttendaceData, getAttendanceTime, getUserInfo } from '../../api/user/user.api'
import useUserStore from '../../store/user.store'
import dayGridPlugin from '@fullcalendar/daygrid'
import './calender.css'
export default function Attendance() {
  const { userDetail, user_id, setUserDetai } = useUserStore()
  const [attendance, setAttendance] = useState<AttendaceData[]>()
  const [calander, setCalander] = useState<{ title: string; date: string }[]>()

  const attendanceCalender = (data: AttendaceData[]) => {
    const newdata = data.map((item) => {
      const newDate = new Date(item.date)
      var month = newDate.getUTCMonth() + 1
      var day = ('0' + newDate.getDate()).slice(-2)
      var year = newDate.getUTCFullYear()
      return { title: 'Attendance', date: `${year}-${month}-${day}` }
    })
    setCalander(newdata)
  }

  const userAttendanceTime = async () => {
    const data = await getAttendanceTime(userDetail?.user_index ?? 0)
    attendanceCalender(data.data)
    setAttendance(data.data)
  }
  
  const getUserDetail = async () => {
    if (user_id === '') return
    try {
      const user = await getUserInfo(user_id)
      console.log(user)
      setUserDetai(user.data)
    } catch (error) {}
  }

  useEffect(() => {
    if (!userDetail) return
    userAttendanceTime()
  }, [userDetail])

  useEffect(() => {
    getUserDetail()
  }, [])

  return (
    <div className=''>
      <h2 className='text-lg text-gray-900  dark:text-white font-semibold'>Attendance Calendar</h2>
      <p className='text-sm text-gray-500 mb-5'>You should go to gyms oftenly</p>
      {calander && (
        <div className='h-4/6'>
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView='dayGridMonth'
            weekends={true}
            events={calander}
            height={600}
          />
          <div className='text-md font-semibold'></div>
          <div className='text-md font-semibold'>
            FingerPrint Register:{userDetail?.can_use_finger ? 'True' : 'False'}
          </div>
          <div className='text-md font-semibold'> Attendance: {attendance?.length}</div>
        </div>
      )}
    </div>
  )
}
