import React, { useCallback, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../../api/auth/login.api'
import Cookies from 'js-cookie'
import useUserStore from '../../store/user.store'
export default function Login() {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { setName, setUserId, setUsername2, setIsLoggin } = useUserStore()
  const navigate = useNavigate()
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    const data = await login({ username: username, password: password })
    if (data) {
      // redi rect
      const userData = data.data.data
      setName(userData.name)
      setUserId(userData._id)
      setUsername2(userData.username)
      setIsLoggin(true)
      Cookies.set('token', data.data.access_token)
      navigate('/')
    }
  }

  return (
    <section className='bg-gray-50 dark:bg-gray-900'>
      <div className='flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <div className='flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white'>
          <img
            className='w-8 h-8 mr-2'
            src='https://i.pinimg.com/736x/0f/8a/78/0f8a7847f053d3b12aa7a5f4e63a285f.jpg'
            alt='logo'
          />
          KingTouanGyms
        </div>
        <div className='w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700'>
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>
              Sign in to your account
            </h1>
            <form className='space-y-4 md:space-y-6' action='#' onSubmit={handleSubmit}>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Username
                </label>
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  name='email'
                  id='email'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                  placeholder='username'
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  type='password'
                  name='password'
                  id='password'
                  placeholder='••••••••'
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
              </div>
              <div className='flex items-center justify-between'>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                  Sign in
                </button>
                <div> Don't have an account?<Link to={'/auth/register'} className='text-blue-700'>Register</Link> </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
