import { useQuery, useMutation, RefetchOptions, QueryObserverResult } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { changeCourseStatus, getCourseStatusInfo } from 'src/apis/course.api'
import { ChangeCourseStatusRequest, CourseInfoResponse, CoursesResponse } from 'src/types/course.type'

type PropsType = {
  handleChangeCourseStatusDisplay: (courseId: number | null) => () => void
  courseId: number
  refetch: (
    options?: RefetchOptions | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<QueryObserverResult<AxiosResponse<CoursesResponse, any>, Error>>
}

export default function ChangeCourseStatus({ handleChangeCourseStatusDisplay, courseId, refetch }: PropsType) {
  const [courseData, setCourseData] = useState<CourseInfoResponse | undefined>(undefined)

  const { data } = useQuery({
    queryKey: ['course-status', courseId],
    queryFn: () => getCourseStatusInfo(courseId)
  })

  useEffect(() => {
    setCourseData(data?.data.data)
  }, [data])

  const changeCourseStatusMutation = useMutation({
    mutationFn: (body: ChangeCourseStatusRequest) => changeCourseStatus(body)
  })

  const convertAllToStatus = (status: boolean, prev: CourseInfoResponse): CourseInfoResponse => {
    return {
      ...prev,
      status,
      lessons: prev.lessons.map((lesson) => {
        return {
          ...lesson,
          status,
          sessions: lesson.sessions.map((session) => {
            return { ...session, status }
          })
        }
      })
    }
  }

  const handleActiveAll = () => {
    setCourseData((prev) => {
      if (!prev) {
        return prev
      }

      return convertAllToStatus(true, prev)
    })
  }

  const handleInActiveAll = () => {
    setCourseData((prev) => {
      if (!prev) {
        return prev
      }

      return convertAllToStatus(false, prev)
    })
  }

  const handleCourseCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const status = event.target.checked
    setCourseData((prev) => {
      if (!prev) {
        return prev
      }

      // if status is true update course's status only
      if (status) {
        return { ...prev, status }
      }

      // if status is false update all status of course, lesson and session to false
      return convertAllToStatus(status, prev)
    })
  }

  const handleLessonCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, lessonId: number) => {
    setCourseData((prev) => {
      if (!prev) {
        return prev
      }

      const status = event.target.checked
      if (status && !courseData?.status) {
        return {
          ...prev,
          status,
          lessons: prev.lessons.map((lesson) => {
            if (lesson.id == lessonId) {
              return {
                ...lesson,
                status: status
              }
            }
            return lesson
          })
        }
      }

      const updatedLessons = prev.lessons.map((lesson) => {
        if (lesson.id === lessonId) {
          const updatedLesson = status
            ? {
                ...lesson,
                status: status
              }
            : {
                ...lesson,
                status: status,
                sessions: lesson.sessions.map((session) => ({
                  ...session,
                  status: status
                }))
              }

          return updatedLesson
        }

        return lesson
      })

      const updatedCourseData = {
        ...prev,
        lessons: updatedLessons
      }

      return updatedCourseData
    })
  }

  const handleSessionCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    lessonId: number,
    sessionId: number
  ) => {
    setCourseData((prev) => {
      if (!prev) {
        return prev
      }

      const status = event.target.checked

      const lesson = prev.lessons.find((lesson) => lesson.id == lessonId)

      if (status && lesson?.status == false) {
        return {
          ...prev,
          status,
          lessons: prev.lessons.map((lesson) => {
            if (lesson.id == lessonId) {
              return {
                ...lesson,
                status,
                sessions: lesson.sessions.map((session) => {
                  if (session.id == sessionId) {
                    return { ...session, status }
                  }
                  return session
                })
              }
            }
            return lesson
          })
        }
      }

      return {
        ...prev,
        lessons: prev.lessons.map((lesson) => {
          if (lesson.id == lessonId) {
            return {
              ...lesson,
              sessions: lesson.sessions.map((session) => {
                if (session.id == sessionId) {
                  return { ...session, status }
                }
                return session
              })
            }
          }
          return lesson
        })
      }
    })
  }

  const convertToChangeCourseStatusPayload = (): ChangeCourseStatusRequest | null => {
    if (!courseData) {
      return null
    }

    const lessonIds = courseData.lessons.filter((lesson) => lesson.status).map((lesson) => lesson.id)

    const sessionIds = courseData.lessons
      .filter((lesson) => lesson.status)
      .flatMap((lesson) => lesson.sessions.filter((session) => session.status).map((session) => session.id))

    return {
      courseId: courseData.id,
      status: courseData.status,
      lessonIds,
      sessionIds
    }
  }

  const handleSubmitChange = () => {
    const payload = convertToChangeCourseStatusPayload()

    if (!payload) {
      return
    }

    changeCourseStatusMutation.mutate(payload, {
      onSuccess(data) {
        handleChangeCourseStatusDisplay(null)()
        refetch()
        toast.success(data.data.message)
      },
      onError(error) {
        console.log('error', error)
      }
    })
  }

  return (
    <div
      aria-hidden={true}
      id='edit-user-modal'
      className='fixed top-0 left-0 right-0 z-50 items-center justify-center flex overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'
    >
      <div className='relative w-full h-full max-w-2xl px-4 md:h-auto'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-800'>
          <div className='flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700'>
            <h3 className='text-xl font-semibold dark:text-white'>Change course status</h3>
            <button
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white'
              data-modal-toggle='edit-user-modal'
              onClick={handleChangeCourseStatusDisplay(null)}
            >
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
                <path
                  fillRule='evenodd'
                  d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                  clipRule='evenodd'
                />
              </svg>
            </button>
          </div>
          <div className='p-6 space-y-6'>
            <button
              type='button'
              onClick={handleActiveAll}
              className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800'
            >
              <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
                Change all to ACTIVE
              </span>
            </button>

            <button
              type='button'
              onClick={handleInActiveAll}
              className='relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'
            >
              <span className='relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0'>
                Change all to INACTIVE
              </span>
            </button>

            <ul>
              <li className='mt-2'>
                <input
                  type='checkbox'
                  name='tall'
                  id='tall'
                  className='mr-2'
                  checked={courseData?.status || false}
                  onChange={handleCourseCheckBoxChange}
                />
                <label htmlFor='tall'>{courseData?.name}</label>
                <ul className='ml-10 mt-2'>
                  {courseData?.lessons &&
                    courseData.lessons.map((lesson) => (
                      <li key={'lesson' + lesson.id}>
                        <input
                          type='checkbox'
                          name={`tall-${lesson.id}`}
                          id={`tall-${lesson.id}`}
                          checked={lesson.status}
                          className='mr-2'
                          onChange={(event) => handleLessonCheckboxChange(event, lesson.id)}
                        />
                        <label htmlFor={`tall-${lesson.id}`}>{lesson.name}</label>
                        <ul className='ml-10'>
                          {lesson.sessions &&
                            lesson.sessions.map((session) => (
                              <li className='mt-2' key={'session' + session.id}>
                                <input
                                  type='checkbox'
                                  name={`tall-${lesson.id}-${session.id}`}
                                  id={`tall-${lesson.id}-${session.id}`}
                                  checked={session.status}
                                  className='mr-2'
                                  onChange={(event) => handleSessionCheckboxChange(event, lesson.id, session.id)}
                                />
                                <label htmlFor={`tall-${lesson.id}-${session.id}`}>{session.name}</label>
                              </li>
                            ))}
                        </ul>
                      </li>
                    ))}
                </ul>
              </li>
            </ul>
          </div>
          {/* Modal footer */}
          <div className='items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700'>
            <button
              className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
              type='button'
              onClick={handleSubmitChange}
            >
              Save all
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
