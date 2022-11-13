import React, { useEffect, useState } from 'react'
import { UserData } from '../../api/admin/admin.api'
import { getUserInfo } from '../../api/user/user.api'
import useUserStore from '../../store/user.store'

export default function User() {
  const { user_id } = useUserStore()
  const [user, setUser] = useState<UserData>()
  const getUserDetail = async () => {
    if (user_id === '') return
    try {
      const user = await getUserInfo(user_id)
      setUser(user.data)
    } catch (error) {}
  }

  useEffect(() => {
    getUserDetail()
  }, [])
  

  return (
    <div className="p-2">
      <h2 className="text-lg text-gray-900  dark:text-white font-semibold">User Detail Page</h2>
      <p className="text-sm text-gray-500 mb-5">This Page contain all user data</p>

      {user && <form>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Username
          </label>
          <input
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder={user.username}
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            User id
          </label>
          <input
            placeholder={user_id}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Register Online
          </label>
          <input
            placeholder={user?.finger_register ? 'True' : 'Fales'}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Register Offline
          </label>
          <input
            placeholder={user?.can_use_finger ? 'True' : 'Fales'}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            User roles
          </label>
          <input
            placeholder={user?.roles[0]}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          />
        </div>
      </form>}
      
    </div>
  )
}
