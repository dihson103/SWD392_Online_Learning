import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { getCourseDetail } from 'src/apis/course.api'
import { getLessonsByCourse } from 'src/apis/lesson.api'
import Lessons from 'src/components/Lessons'
import { baseURL } from 'src/utils/http'
import { getIdFromNameId } from 'src/utils/utils'

export default function CourseDetails() {
  const { nameId } = useParams()
  const id = getIdFromNameId(nameId as string)
  const isIdValid = id !== undefined && /^[\d+]+$/.test(id)

  const { data: courseData } = useQuery({
    queryKey: ['course', id],
    queryFn: () => (isIdValid ? getCourseDetail(Number(id)) : Promise.resolve(null))
  })

  const { data: lessonsData } = useQuery({
    queryKey: ['lessons'],
    queryFn: () => (isIdValid ? getLessonsByCourse(Number(id)) : Promise.resolve(null))
  })

  const imageUrl = `${baseURL}api/media/images/${courseData?.data.data?.image}`

  return (
    <div className='container mx-20 mt-20'>
      <div className='flex flex-col md:flex-row lg:flex-col xl:flex-row'>
        <div className='flex-auto w-2/3 mr-5'>
          <div className='xl:h-[470px] h-[350px] mb-10 course-main-thumb'>
            <img src={imageUrl} alt='' className=' rounded-md object-fut w-full h-full block' />
          </div>
          <h2 className='text-3xl font-semibold text-gray-900 dark:text-white'>{courseData?.data.data?.courseName}</h2>

          <div className='mt-5'>
            <h3 className='text-3xl font-normal text-gray-900 dark:text-white'>Course Description</h3>
            <p className='mt-4 text-lg font-thin text-gray-900 dark:text-white'>{courseData?.data.data?.title}</p>
          </div>

          <Lessons lessonsData={lessonsData?.data} />
        </div>
        <div className='flex-auto w-1/3'>
          <div className='w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700'>
            <h5 className='mb-4 text-xl font-medium text-gray-500 dark:text-gray-400'>Standard plan</h5>
            <div className='flex items-baseline text-gray-900 dark:text-white'>
              <span className='text-3xl font-semibold'>$</span>
              <span className='text-5xl font-extrabold tracking-tight'>{courseData?.data.data?.price}</span>
              <span className='ml-1 text-xl font-normal text-gray-500 dark:text-gray-400'>/course</span>
            </div>
            <ul className='space-y-5 my-7'>
              <li className='flex space-x-3 items-center'>
                <svg
                  className='flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                </svg>
                <span className='text-base font-normal leading-tight text-gray-500 dark:text-gray-400'>
                  2 team members
                </span>
              </li>
              <li className='flex space-x-3'>
                <svg
                  className='flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                </svg>
                <span className='text-base font-normal leading-tight text-gray-500 dark:text-gray-400'>
                  20GB Cloud storage
                </span>
              </li>
              <li className='flex space-x-3'>
                <svg
                  className='flex-shrink-0 w-4 h-4 text-blue-600 dark:text-blue-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                </svg>
                <span className='text-base font-normal leading-tight text-gray-500 dark:text-gray-400'>
                  Integration help
                </span>
              </li>
              <li className='flex space-x-3 line-through decoration-gray-500'>
                <svg
                  className='flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                </svg>
                <span className='text-base font-normal leading-tight text-gray-500'>Sketch Files</span>
              </li>
              <li className='flex space-x-3 line-through decoration-gray-500'>
                <svg
                  className='flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                </svg>
                <span className='text-base font-normal leading-tight text-gray-500'>API Access</span>
              </li>
              <li className='flex space-x-3 line-through decoration-gray-500'>
                <svg
                  className='flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                </svg>
                <span className='text-base font-normal leading-tight text-gray-500'>Complete documentation</span>
              </li>
              <li className='flex space-x-3 line-through decoration-gray-500'>
                <svg
                  className='flex-shrink-0 w-4 h-4 text-gray-400 dark:text-gray-500'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z' />
                </svg>
                <span className='text-base font-normal leading-tight text-gray-500'>
                  24×7 phone &amp; email support
                </span>
              </li>
            </ul>
            <button
              type='button'
              className='text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-200 dark:focus:ring-blue-900 font-medium rounded-lg text-sm px-5 py-2.5 inline-flex justify-center w-full text-center'
            >
              Enroll now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
