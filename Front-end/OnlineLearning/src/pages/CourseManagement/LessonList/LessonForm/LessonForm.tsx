import { yupResolver } from '@hookform/resolvers/yup'
import { QueryObserverResult, RefetchOptions, useMutation } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { addLesson, updateLesson } from 'src/apis/lesson.api'
import Input from 'src/components/Input'
import { Lesson, LessonsResponse } from 'src/types/lesson.type'
import { LessonCreateSchema, LessonUpdateSchema, lessonCreateSchema } from 'src/utils/rules'

type PropType = {
  handleDisplayForm: (status: boolean, lesson: Lesson | null) => () => void
  lessonUpdate: Lesson | null
  courseId: number
  refetch: (
    options?: RefetchOptions | undefined
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<QueryObserverResult<AxiosResponse<LessonsResponse, any> | null, Error>>
}

export default function LessonForm({ handleDisplayForm, lessonUpdate, courseId, refetch }: PropType) {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors }
  } = useForm<LessonCreateSchema | LessonUpdateSchema>({
    resolver: yupResolver(lessonCreateSchema)
  })

  useEffect(() => {
    if (lessonUpdate) {
      setValue('id', lessonUpdate.id)
      setValue('status', lessonUpdate.status)
      setValue('title', lessonUpdate.title)
      setValue('content', lessonUpdate.content)
      setValue('courseId', courseId)
    } else {
      setValue('courseId', courseId)
    }
  }, [lessonUpdate, setValue, courseId])

  const updateLessonMutation = useMutation({
    mutationFn: (body: LessonUpdateSchema) => updateLesson(body)
  })

  const addLessonMutation = useMutation({
    mutationFn: (body: LessonCreateSchema) => addLesson(body)
  })

  const handleFormSubmit = handleSubmit((data) => {
    if (lessonUpdate) {
      updateLessonMutation.mutate(data as LessonUpdateSchema, {
        onSuccess(data) {
          handleDisplayForm(false, null)()
          refetch()
          toast.success(data.data.message)
        },
        onError(error) {
          console.log('>>> update error', error)
        }
      })
    } else {
      addLessonMutation.mutate(data, {
        onSuccess(data) {
          handleDisplayForm(false, null)()
          refetch()
          toast.success(data.data.message)
        },
        onError(error) {
          console.log('add error', error)
        }
      })
    }
  })

  return (
    <div
      aria-hidden={true}
      id='edit-user-modal'
      className='fixed top-0 left-0 right-0 z-50 items-center justify-center flex overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full'
    >
      <div className='relative w-full h-full max-w-2xl px-4 md:h-auto'>
        <div className='relative bg-white rounded-lg shadow dark:bg-gray-800'>
          <div className='flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700'>
            <h3 className='text-xl font-semibold dark:text-white'>{lessonUpdate ? 'Update' : 'Add'} lesson</h3>
            <button
              type='button'
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white'
              data-modal-toggle='edit-user-modal'
              onClick={handleDisplayForm(false, null)}
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
            <form>
              <div className='grid grid-cols-6 gap-6'>
                <Input
                  className='col-span-6 sm:col-span-3'
                  label='Lesson title'
                  name='title'
                  type='text'
                  errorMessage={errors.title?.message}
                  register={register}
                  labelClass='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  inputClass='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder='Course name'
                />
                <Input
                  className='col-span-6 sm:col-span-3'
                  label='Lesson status'
                  name='status'
                  type='text'
                  errorMessage={errors.status?.message}
                  register={register}
                  labelClass='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  inputClass='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder='Course name'
                />
                <div className='col-span-12 sm:col-span-6'>
                  <label htmlFor='content' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Description
                  </label>
                  <textarea
                    id='content'
                    rows={4}
                    {...register('content')}
                    className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Write your thoughts here...'
                    defaultValue={''}
                  />
                  <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.content?.message}</div>
                </div>
              </div>
            </form>
          </div>
          {/* Modal footer */}
          <div className='items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700'>
            <button
              className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
              type='button'
              onClick={handleFormSubmit}
            >
              Save all
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
