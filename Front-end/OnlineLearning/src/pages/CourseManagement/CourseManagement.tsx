import { Link } from 'react-router-dom'
import CourseForm from './CourseForm'
import { useState } from 'react'
import ConfirmDelete from './ConfirmDelete'
import { Course, SearchCourseParams } from 'src/types/course.type'
import useQueryParams from 'src/hooks/useQueryParams'
import { useQuery } from '@tanstack/react-query'
import { searchCoursesAndStatus } from 'src/apis/course.api'

export type QueryConfig = {
  [key in keyof SearchCourseParams]?: string
}

export default function CourseManagement() {
  const [display, setDisplay] = useState<boolean>(false)
  const [isDisplayConfirmDelete, setIsDisplayConfirmDelete] = useState<boolean>(false)
  const [updateCourse, setUpdateCourse] = useState<Course | null>(null)

  const queryConfig: QueryConfig = useQueryParams()

  const queryParams: SearchCourseParams = {
    searchValue: queryConfig.searchValue ? queryConfig.searchValue : '',
    status: queryConfig.status == 'false' ? 'false' : 'true'
  }

  const handleFormDisplay = (isDisplay: boolean, course: Course | null) => () => {
    setUpdateCourse(course)
    setDisplay(isDisplay)
  }

  const handleConfirmDeleteForm = (status: boolean) => () => {
    setIsDisplayConfirmDelete(status)
  }

  const { data } = useQuery({
    queryKey: ['admin/courses', queryParams],
    queryFn: () => searchCoursesAndStatus(queryParams)
  })

  const handleSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    queryParams.searchValue = event.target.value
    console.log('>>> check event', queryParams)
  }

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    queryParams.status = event.target.value === 'ACTIVE' ? 'true' : 'false'
    console.log('>>> check event', queryParams)
  }

  const courseData: Course[] | undefined = data?.data.data

  return (
    <>
      <div className='mt-20 mr-10 ml-10'>
        <div className='p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5 dark:bg-gray-800 dark:border-gray-700'>
          <div className='w-full mb-1'>
            <div className='mb-4'>
              <nav className='flex mb-5' aria-label='Breadcrumb'>
                <ol className='inline-flex items-center space-x-1 text-sm font-medium md:space-x-2'>
                  <li className='inline-flex items-center'>
                    <Link
                      to={'/'}
                      className='inline-flex items-center text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-white'
                    >
                      <svg
                        className='w-5 h-5 mr-2.5'
                        fill='currentColor'
                        viewBox='0 0 20 20'
                        xmlns='http://www.w3.org/2000/svg'
                      >
                        <path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z' />
                      </svg>
                      Home
                    </Link>
                  </li>
                  <li>
                    <div className='flex items-center'>
                      <svg
                        className='w-6 h-6 text-gray-400'
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
                      <Link
                        to={'/'}
                        className='ml-1 text-gray-700 hover:text-primary-600 md:ml-2 dark:text-gray-300 dark:hover:text-white'
                      >
                        E-commerce
                      </Link>
                    </div>
                  </li>
                  <li>
                    <div className='flex items-center'>
                      <svg
                        className='w-6 h-6 text-gray-400'
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
                      <span className='ml-1 text-gray-400 md:ml-2 dark:text-gray-500' aria-current='page'>
                        Products
                      </span>
                    </div>
                  </li>
                </ol>
              </nav>
              <h1 className='text-xl font-semibold text-gray-900 sm:text-2xl dark:text-white'>All products</h1>
            </div>
            <div className='items-center justify-between block sm:flex md:divide-x md:divide-gray-100 dark:divide-gray-700'>
              <div className='flex items-center mb-4 sm:mb-0'>
                <form className='sm:pr-3' action='#' method='GET'>
                  <label htmlFor='products-search' className='sr-only'>
                    Search
                  </label>
                  <div className='relative w-48 mt-1 sm:w-64 xl:w-96'>
                    <input
                      type='text'
                      name='email'
                      id='products-search'
                      onChange={handleSearchValueChange}
                      className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                      placeholder='Search for products'
                    />
                  </div>
                </form>
                <div className='flex pl-0 mt-3 space-x-1 sm:pl-2 sm:mt-0'>
                  <select
                    className='bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                    onChange={handleStatusChange}
                    value={queryParams.status === 'true' ? 'ACTIVE' : 'INACTIVE'}
                  >
                    <option value='ACTIVE'>ACTIVE</option>
                    <option value='INACTIVE'>INACTIVE</option>
                  </select>
                </div>
              </div>
              <button
                id='createProductButton'
                className='text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2'
                type='button'
                data-drawer-target='drawer-create-product-default'
                data-drawer-show='drawer-create-product-default'
                aria-controls='drawer-create-product-default'
                data-drawer-placement='right'
                onClick={handleFormDisplay(true, null)}
              >
                Add new course
              </button>
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
                        Course Name
                      </th>
                      <th
                        scope='col'
                        className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                      >
                        Title
                      </th>
                      <th
                        scope='col'
                        className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                      >
                        Price
                      </th>
                      <th
                        scope='col'
                        className='p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400'
                      >
                        Create Date
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
                        Public Date
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
                    {courseData &&
                      courseData.map((course) => (
                        <tr className='hover:bg-gray-100 dark:hover:bg-gray-700' key={course.id}>
                          <td className='w-4 p-4'>
                            <div className='flex items-center'>
                              <input
                                id='checkbox-{{ .id }}'
                                aria-describedby='checkbox-1'
                                type='checkbox'
                                className='w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600'
                              />
                              <label htmlFor='checkbox-{{ .id }}' className='sr-only'>
                                checkbox
                              </label>
                            </div>
                          </td>
                          <td className='p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400'>
                            <div className='text-base font-semibold text-gray-900 dark:text-white'>
                              {course.courseName}
                            </div>
                          </td>
                          <td className='max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
                            {course.title}
                          </td>
                          <td className='p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                            {'$ ' + course.price}
                          </td>
                          <td className='p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                            {course.createdDate.substring(0, 10)}
                          </td>
                          <td className='p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                            {course.status ? 'ACTIVE' : 'INACTIVE'}
                          </td>
                          <td className='p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white'>
                            {course.publicDate ? course.publicDate.substring(0, 10) : ''}
                          </td>
                          <td className='p-4 space-x-2 whitespace-nowrap'>
                            <button
                              type='button'
                              id='updateProductButton'
                              data-drawer-target='drawer-update-product-default'
                              data-drawer-show='drawer-update-product-default'
                              aria-controls='drawer-update-product-default'
                              onClick={handleFormDisplay(true, course)}
                              data-drawer-placement='right'
                              className='inline-flex items-center text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2'
                            >
                              <svg
                                className='w-4 h-4 mr-2'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z' />
                                <path
                                  fillRule='evenodd'
                                  d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
                                  clipRule='evenodd'
                                />
                              </svg>
                              Update
                            </button>
                            <button
                              type='button'
                              id='deleteProductButton'
                              data-drawer-target='drawer-delete-product-default'
                              data-drawer-show='drawer-delete-product-default'
                              aria-controls='drawer-delete-product-default'
                              data-drawer-placement='right'
                              onClick={handleConfirmDeleteForm(true)}
                              className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900'
                            >
                              <svg
                                className='w-4 h-4 mr-2'
                                fill='currentColor'
                                viewBox='0 0 20 20'
                                xmlns='http://www.w3.org/2000/svg'
                              >
                                <path
                                  fillRule='evenodd'
                                  d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
                                  clipRule='evenodd'
                                />
                              </svg>
                              Change Status
                            </button>
                          </td>
                        </tr>
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
              to={'/'}
              className='inline-flex justify-center p-1 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
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
              to={'/'}
              className='inline-flex justify-center p-1 mr-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'
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
              to={'/'}
              className='inline-flex items-center justify-center flex-1 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2'
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
              to={'/'}
              className='inline-flex items-center justify-center flex-1 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center me-2 mb-2'
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
      </div>

      {display && <CourseForm handleFormDisplay={handleFormDisplay} updateCourse={updateCourse} />}

      {isDisplayConfirmDelete && <ConfirmDelete handleConfirmDeleteForm={handleConfirmDeleteForm} />}
    </>
  )
}
