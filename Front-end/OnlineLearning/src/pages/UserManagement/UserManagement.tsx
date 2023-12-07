/* eslint-disable react/no-unescaped-entities */
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'

import { deleteUser, getUsers } from 'src/apis/user.api'
import UserRow from './UserRow'
import { User, UserListConfig } from 'src/types/user.type'
import UserForm from './UserForm'
import { toast } from 'react-toastify'
import FormStatus from 'src/constants/formStatus'
import { UserSchema } from 'src/utils/rules'
import useQueryParams from 'src/hooks/useQueryParams'

const initialFormData: UserSchema = {
  email: '',
  address: '',
  dob: '',
  phone: '',
  username: '',
  role: 'USER'
}

type QueryConfig = {
  [key in keyof UserListConfig]: string
}

export default function UserManagement() {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [isDelete, setIsDelete] = useState<boolean>(false)
  const [formDatatState, setFormDatatState] = useState<User | UserSchema>(initialFormData)
  const [idDelete, setIdDelete] = useState<number>(0)
  const queryParams: QueryConfig = useQueryParams()
  const navigate = useNavigate()

  const getRoleFromParam = (role: string) => {
    if (role.toUpperCase() === 'ADMIN') return 'ADMIN'
    return 'USER'
  }

  const queryConfig: QueryConfig = {
    searchValue: queryParams.searchValue || '',
    role: queryParams.role ? getRoleFromParam(queryParams.role) : 'USER',
    status: queryParams.status === 'false' ? 'false' : 'true'
  }

  const handleDisplayForm = (status: FormStatus, userData: User | UserSchema) => () => {
    setFormDatatState(() => userData)
    if (status === FormStatus.Display) {
      setIsEdit(true)
    } else if (status === FormStatus.Hidden) {
      setIsEdit(false)
    } else {
      setIsEdit(false)
      refetch()
    }
  }

  const handleDisplayConfirmDelete = (status: boolean, userId: number) => () => {
    console.log('display', status)
    setIdDelete(userId)
    setIsDelete(status)
  }

  const { data, refetch } = useQuery({
    queryKey: ['users', queryConfig],
    queryFn: () => getUsers(queryConfig)
  })

  const deleteUserMutation = useMutation({
    mutationFn: (userId: number) => deleteUser(userId)
  })

  const handleDeleteUser = () => {
    deleteUserMutation.mutate(idDelete, {
      onSuccess: (data) => {
        handleDisplayConfirmDelete(false, 0)()
        refetch()
        toast.success(data.data.message)
      }
    })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const queryParam = { ...queryConfig, searchValue: event.target.value }
    handleSearchChange(queryParam)
  }

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const queryParam = { ...queryConfig, role: event.target.value }
    handleSearchChange(queryParam)
  }

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const queryParam = { ...queryConfig, status: event.target.value == 'ACTIVE' ? 'true' : 'false' }
    handleSearchChange(queryParam)
  }

  const handleSearchChange = (params: QueryConfig) => {
    navigate(`/admin/users?searchValue=${params.searchValue}&status=${params.status}&role=${params.role}`)
  }

  return (
    <div className='mr-10 ml-10'>
      <div className='p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700'>
        <div className='w-full mb-1'>
          <div className='mb-4 mt-10'>
            <h1 className='text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white'>All users</h1>
          </div>
          <div className='sm:flex'>
            <div className='items-center hidden mb-3 sm:flex sm:divide-x sm:divide-gray-100 sm:mb-0 dark:divide-gray-700'>
              <div className='lg:pr-3'>
                <label htmlFor='users-search' className='sr-only'>
                  Search
                </label>
                <div className='relative mt-1 lg:w-64 xl:w-96'>
                  <input
                    type='text'
                    name='email'
                    id='users-search'
                    onChange={handleInputChange}
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    placeholder='Search for users'
                  />
                </div>
              </div>
              <div className='flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0'>
                <select
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  onChange={handleStatusChange}
                  value={queryConfig.status === 'true' ? 'ACTIVE' : 'INACTIVE'}
                >
                  <option value='ACTIVE'>ACTIVE</option>
                  <option value='INACTIVE'>INACTIVE</option>
                </select>
              </div>
              <div className='flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0 ml-3'>
                <select
                  className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  onChange={handleRoleChange}
                  value={queryConfig.role}
                >
                  <option value='USER'>USER</option>
                  <option value='ADMIN'>ADMIN</option>
                </select>
              </div>
            </div>
            <div className='flex items-center ml-auto space-x-2 sm:space-x-3'>
              <button
                type='button'
                data-modal-toggle='add-user-modal'
                onClick={handleDisplayForm(FormStatus.Display, initialFormData)}
                className='inline-flex items-center text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
              >
                <svg
                  className='w-5 h-5 mr-2 -ml-1'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z'
                    clipRule='evenodd'
                  />
                </svg>
                Add user
              </button>
              <Link
                to='#'
                className='inline-flex items-center py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700'
              >
                <svg
                  className='w-5 h-5 mr-2 -ml-1'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z'
                    clipRule='evenodd'
                  />
                </svg>
                Export
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='flex flex-col'>
        <div className='overflow-x-auto'>
          <div className='inline-block min-w-full align-middle'>
            <div className='overflow-hidden shadow'>
              <table className='min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600'>
                <thead className='bg-gray-100 dark:bg-gray-700'>
                  <tr>
                    <th scope='col' className='p-4'>
                      <div className='flex items-center'>
                        <input
                          id='checkbox-all'
                          aria-describedby='checkbox-1'
                          type='checkbox'
                          className='w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600'
                        />
                        <label htmlFor='checkbox-all' className='sr-only'>
                          checkbox
                        </label>
                      </div>
                    </th>
                    <th
                      scope='col'
                      className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                    >
                      Name
                    </th>
                    <th
                      scope='col'
                      className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                    >
                      Role
                    </th>
                    <th
                      scope='col'
                      className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                    >
                      Date of birth
                    </th>
                    <th
                      scope='col'
                      className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                    >
                      Address
                    </th>
                    <th
                      scope='col'
                      className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                    >
                      Status
                    </th>
                    <th
                      scope='col'
                      className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
                  {data?.data?.data?.map((user, index) => (
                    <UserRow
                      key={index}
                      profile={user}
                      handleDisplayForm={handleDisplayForm}
                      handleDisplayConfirmDelete={handleDisplayConfirmDelete}
                      status={queryConfig.status == 'true'}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className='sticky bottom-0 right-0 items-center w-full p-4 bg-white border-t border-gray-200 sm:flex sm:justify-between dark:bg-gray-800 dark:border-gray-700'>
        <div className='flex items-center mb-4 sm:mb-0'>
          <Link
            to='#'
            className='inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          >
            <svg className='w-7 h-7' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </Link>
          <Link
            to='#'
            className='inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
          >
            <svg className='w-7 h-7' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </Link>
          <span className='text-sm font-normal text-gray-500 dark:text-gray-400'>
            Showing <span className='font-semibold text-gray-900 dark:text-white'>1-20</span> of{' '}
            <span className='font-semibold text-gray-900 dark:text-white'>2290</span>
          </span>
        </div>
        <div className='flex items-center space-x-3'>
          <Link
            to='#'
            className='inline-flex items-center justify-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
          >
            <svg
              className='w-5 h-5 mr-1 -ml-1'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z'
                clipRule='evenodd'
              />
            </svg>
            Previous
          </Link>
          <Link
            to='#'
            className='inline-flex items-center justify-center text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
          >
            Next
            <svg
              className='w-5 h-5 ml-1 -mr-1'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
                clipRule='evenodd'
              />
            </svg>
          </Link>
        </div>
      </div>

      <div
        aria-hidden='true'
        className={`fixed top-0 left-0 right-0 z-50 ${
          isEdit ? '' : ' hidden'
        } items-center justify-center flex overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        id='edit-user-modal'
      >
        <UserForm
          formDatatState={formDatatState}
          handleDisplayForm={handleDisplayForm}
          initialFormData={initialFormData}
        />
      </div>

      <div
        id='popup-modal'
        tabIndex={-1}
        className={`fixed top-0 left-0 right-0 z-50 ${
          isDelete ? '' : ' hidden'
        } justify-center items-center flex p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
      >
        <div className='relative w-full max-w-md max-h-full'>
          <div className='relative bg-white rounded-lg shadow dark:bg-gray-700'>
            <button
              type='button'
              onClick={handleDisplayConfirmDelete(false, 0)}
              className='absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
              data-modal-hide='popup-modal'
            >
              <svg
                className='w-3 h-3'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 14'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
                />
              </svg>
              <span className='sr-only'>Close modal</span>
            </button>
            <div className='p-6 text-center'>
              <svg
                className='mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 20'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z'
                />
              </svg>
              <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                Are you sure you want to delete user has id: {idDelete}?
              </h3>
              <button
                data-modal-hide='popup-modal'
                type='button'
                onClick={handleDeleteUser}
                className='text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2'
              >
                Yes, I'm sure
              </button>
              <button
                data-modal-hide='popup-modal'
                onClick={handleDisplayConfirmDelete(false, 0)}
                type='button'
                className='text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600'
              >
                No, cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
