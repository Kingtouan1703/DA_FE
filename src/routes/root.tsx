import Cookies from 'js-cookie'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import useUserStore from '../store/user.store'
import clsx from 'clsx'
export default function Root() {
  const navigate = useNavigate()
  const location = useLocation()
  const { isLoggin, username } = useUserStore()
  const logout = () => {
    Cookies.remove('token')
    navigate('/auth/login')
  }
  const handleLogOut = () => {
    logout()
  }

  return (
    <div className='root min-h-screen  overflow-y-auto'>
      {/* nav bar  */}
      <nav className='bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900 '>
        <div className='container flex flex-wrap justify-between items-center w-8/12 mx-auto'>
          <div className='flex items-center'>
            <img
              src='https://i.pinimg.com/736x/0f/8a/78/0f8a7847f053d3b12aa7a5f4e63a285f.jpg'
              className='mr-3 h-6 sm:h-9'
              alt='Flowbite Logo'
            />
            <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white'>
              KingTouanGyms
            </span>
          </div>
          <button
            data-collapse-toggle='navbar-default'
            type='button'
            className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='navbar-default'
            aria-expanded='false'>
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-6 h-6'
              aria-hidden='true'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
                clipRule='evenodd'></path>
            </svg>
          </button>
          <div className='hidden w-full md:block md:w-auto' id='navbar-default'>
            <ul className='flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700'>
              <Link to='/'>
                <div className='block py-2 pr-4 pl-3 text-black bg-blue-700 rounded md:bg-transparent  md:p-0 dark:text-white'>
                  Home
                </div>
              </Link>
              {isLoggin ? (
                <Link to='/user'>
                  <a
                    href='#'
                    className='block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>
                    {`Username : ${username}`}
                  </a>
                </Link>
              ) : (
                <Link to='/auth/login'>
                  <div className='block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent'>
                    Login
                  </div>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav>
      {/* content */}
      <div className=' bg-slate-100 h-full'>
        <div className='content flex w-8/12 mx-auto '>
          {/* side bar  */}
          <aside className='w-64 h-full ' aria-label='Sidebar '>
            <div className='overflow-y-auto py-4 px-3 bg-gray-50 p-2 rounded dark:bg-gray-800'>
              <ul className='space-y-2'>
                <p className='tracking-tighter text-sm font-semibold text-gray-500  dark:text-gray-400 mb-2'>
                  Gyms Infomation
                </p>
                <li>
                  <Link
                    to='/'
                    className={clsx(
                      'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 ',
                      location.pathname === '/' && 'bg-gradient-to-r from-indigo-100 to-indigo-50'
                    )}>
                    <svg
                      aria-hidden='true'
                      className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path d='M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z'></path>
                    </svg>
                    <span className='flex-1 ml-3 whitespace-nowrap'>Home</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to='/dashboard'
                    className={clsx(
                      'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700',
                      location.pathname === '/dashboard' &&
                        'bg-gradient-to-r from-indigo-100 to-indigo-50'
                    )}>
                    <svg
                      aria-hidden='true'
                      className='w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path d='M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z'></path>
                      <path d='M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z'></path>
                    </svg>
                    <span className='ml-3'>Dashboard</span>
                  </Link>
                </li>
                <p className='tracking-tighter text-gray-500 text-sm font-semibold dark:text-gray-400 mb-2'>
                  Admin
                </p>
                <li>
                  <Link
                    to='admin'
                    className={clsx(
                      'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700',
                      location.pathname === '/admin' &&
                        'bg-gradient-to-r from-indigo-100 to-indigo-50'
                    )}>
                    <svg
                      aria-hidden='true'
                      className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path d='M8.707 7.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l2-2a1 1 0 00-1.414-1.414L11 7.586V3a1 1 0 10-2 0v4.586l-.293-.293z'></path>
                      <path d='M3 5a2 2 0 012-2h1a1 1 0 010 2H5v7h2l1 2h4l1-2h2V5h-1a1 1 0 110-2h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z'></path>
                    </svg>
                    <span className='flex-1 ml-3 whitespace-nowrap'>Admin</span>
                  </Link>
                </li>
                <p className='tracking-tighter text-gray-500 text-sm font-semibold dark:text-gray-400 mb-2'>
                  User
                </p>
                <Link to='/user'>
                  <div
                    className={clsx(
                      'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700',
                      location.pathname === '/user' &&
                        'bg-gradient-to-r from-indigo-100 to-indigo-50'
                    )}>
                    <svg
                      aria-hidden='true'
                      className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        d='M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z'
                        clipRule='evenodd'></path>
                    </svg>
                    <span className='flex-1 ml-3 whitespace-nowrap'>Users</span>
                  </div>
                </Link>
                <li>
                  <Link
                    to='/attendance'
                    className={clsx(
                      'flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700',
                      location.pathname === '/attendance' &&
                        'bg-gradient-to-r from-indigo-100 to-indigo-50'
                    )}>
                    <svg
                      aria-hidden='true'
                      className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        d='M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z'
                        clipRule='evenodd'></path>
                    </svg>
                    <span className='flex-1 ml-3 whitespace-nowrap'>Attendance</span>
                  </Link>
                </li>
                <p className='tracking-tighter text-gray-500 text-sm font-semibold dark:text-gray-400 mb-2'>
                  Action
                </p>
                <div>
                  <div className='flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'>
                    <svg
                      aria-hidden='true'
                      className='flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'>
                      <path
                        fillRule='evenodd'
                        d='M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z'
                        clipRule='evenodd'></path>
                    </svg>
                    <span className='flex-1 ml-3 whitespace-nowrap' onClick={handleLogOut}>
                      Log out
                    </span>
                  </div>
                </div>
              </ul>
            </div>
          </aside>
          {/* body */}
          <div className='w-full outlet-container px-5'>
            <Outlet />
          </div>
        </div>
      </div>
      {/* footer */}
    </div>
  )
}
