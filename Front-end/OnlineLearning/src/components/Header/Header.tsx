import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import path from 'src/constants/path'
import { AppContext } from 'src/contexts/app.context'
import { Popover } from '@mui/material'
import { signOut } from 'src/apis/auth.api'
import { useQuery } from '@tanstack/react-query'
import { clearTokenAndProfile } from 'src/utils/auth'

export default function Header() {
  const [isHiddenMegaMenu, setHiddenMegaMenu] = useState<boolean>(true)
  const { isAuthenticated, profile, setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()

  const handleMegaMenu = () => {
    setHiddenMegaMenu((prev) => !prev)
  }

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const { refetch } = useQuery({
    queryKey: ['logout'],
    queryFn: () => signOut(),
    enabled: false
  })

  const handleLogout = () => {
    setIsAuthenticated(false)
    setProfile(null)
    clearTokenAndProfile()
    refetch()
    navigate('/')
  }

  return (
    <nav className='bg-gray-100 border-gray-200 dark:bg-gray-900 fixed top-0 left-0 right-0 z-50'>
      <div className='flex flex-wrap items-center justify-between max-w-screen-xl mx-auto p-4'>
        <Link to='https://flowbite.com' className='flex items-center'>
          <img src='https://flowbite.com/docs/images/logo.svg' className='h-8 mr-3' alt='Flowbite Logo' />
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'>Flowbite</span>
        </Link>

        <div className='flex items-center md:order-2'>
          {!isAuthenticated && (
            <>
              <Link
                to={path.login}
                className='text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800'
              >
                Login
              </Link>
              <Link
                to={path.register}
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 md:px-5 md:py-2.5 mr-1 md:mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'
              >
                Sign up
              </Link>
            </>
          )}

          {isAuthenticated && (
            <div className='mr-2'>
              <div aria-describedby={id} onClick={handleClick}>
                <img
                  aria-describedby={id}
                  data-dropdown-toggle='userDropdown'
                  data-dropdown-placement='bottom-start'
                  className='w-8 h-8 rounded-full cursor-pointer'
                  src='https://flowbite.com/docs/images/logo.svg'
                  alt='User dropdown'
                />
              </div>

              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
              >
                <div
                  id='userDropdown'
                  className={`z-10 bg-white divide-y divide-gray-100 fixed right-5 top-15 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
                >
                  <div className='px-4 py-3 text-sm text-gray-900 dark:text-white'>
                    <div>{profile?.username}</div>
                    <div className='font-medium truncate'>{profile?.email}</div>
                  </div>
                  <ul className='py-2 text-sm text-gray-700 dark:text-gray-200' aria-labelledby='avatarButton'>
                    <li>
                      <Link
                        to='#'
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={`/profile/${profile?.username}`}
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        to='#'
                        className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'
                      >
                        Earnings
                      </Link>
                    </li>
                  </ul>
                  <div className='py-1'>
                    <button
                      type='button'
                      onClick={handleLogout}
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white'
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </Popover>
            </div>
          )}

          <button
            data-collapse-toggle='mega-menu'
            type='button'
            onClick={handleMegaMenu}
            className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
            aria-controls='mega-menu'
            aria-expanded='false'
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='w-5 h-5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 17 14'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M1 1h15M1 7h15M1 13h15'
              />
            </svg>
          </button>
        </div>

        <div
          id='mega-menu'
          className={`items-center justify-between w-full md:flex md:w-auto md:order-1${
            isHiddenMegaMenu ? ' hidden' : ''
          }`}
        >
          <ul className='flex flex-col mt-4 font-medium md:flex-row md:space-x-8 md:mt-0'>
            <li>
              <Link
                to='#'
                className='block py-2 pl-3 pr-4 text-blue-600 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-blue-500 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700'
                aria-current='page'
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to='#'
                className='block py-2 pl-3 pr-4 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700'
              >
                Courses
              </Link>
            </li>
            <li>
              <Link
                to='#'
                className='block py-2 pl-3 pr-4 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700'
              >
                Team
              </Link>
            </li>
            <li>
              <Link
                to='#'
                className='block py-2 pl-3 pr-4 text-gray-900 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-600 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-blue-500 md:dark:hover:bg-transparent dark:border-gray-700'
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
