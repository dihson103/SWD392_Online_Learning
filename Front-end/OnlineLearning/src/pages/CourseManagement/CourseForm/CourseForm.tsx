import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { addNewCourse, updateCourseFunction } from 'src/apis/course.api'
import { uploadImage } from 'src/apis/file.api'
import Input from 'src/components/Input'
import { Course, CreateCourseType } from 'src/types/course.type'
import { CourseUpdateSchema, CreateCourseSchema, createCourseSchema } from 'src/utils/rules'

interface PropsType {
  handleFormDisplay: (isDisplay: boolean, course: Course | null) => () => void
  updateCourse: Course | null
}

export default function CourseForm({ handleFormDisplay, updateCourse }: PropsType) {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isUploadImage, setIsUploadImage] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<CourseUpdateSchema | CreateCourseSchema>({
    resolver: yupResolver(createCourseSchema)
  })

  useEffect(() => {
    if (updateCourse) {
      setIsUploadImage(true)
      setValue('courseName', updateCourse.courseName)
      setValue('title', updateCourse.title)
      setValue('image', updateCourse.image)
      setValue('id', updateCourse.id)
      setValue('price', updateCourse.price)
    } else {
      setValue('image', 'initial image')
    }
  }, [updateCourse, setValue])

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const image = event.target.files ? event.target.files[0] : null
    setImageFile(image)
  }

  const addCourseMutation = useMutation({
    mutationFn: (body: CreateCourseType) => addNewCourse(body)
  })

  const uploadImageMutation = useMutation({
    mutationFn: (body: FormData) => uploadImage(body)
  })

  const updateCourseMutation = useMutation({
    mutationFn: (body: CourseUpdateSchema) => updateCourseFunction(body)
  })

  const handleUploadImage = () => {
    if (imageFile) {
      const formData = new FormData()
      formData.append('file', imageFile)
      uploadImageMutation.mutate(formData, {
        onSuccess(data) {
          setIsUploadImage(true)
          setValue('image', data.data.data?.filename as string)
        },
        onError(error) {
          console.log('>>> upload error', error)
        }
      })
    } else {
      toast.error('Please choose file to upload')
    }
  }

  const handleSubmitForm = handleSubmit((data) => {
    if (updateCourse) {
      updateCourseMutation.mutate(data as CourseUpdateSchema, {
        onSuccess(data) {
          toast.success(data.data.message)
        },
        onError(error) {
          console.log('>>> update course error', error)
        }
      })
    } else {
      if (imageFile == null) {
        toast.error('Course image is required')
        return
      }

      addCourseMutation.mutate(data, {
        onSuccess(data) {
          toast.success(data.data.message)
        },
        onError(error) {
          console.log('>>> add new course error', error)
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
            <h3 className='text-xl font-semibold dark:text-white'>{updateCourse ? 'Update' : 'Create'} course</h3>
            <button
              type='button'
              onClick={handleFormDisplay(false, null)}
              className='text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-700 dark:hover:text-white'
              data-modal-toggle='edit-user-modal'
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
            <form onSubmit={handleSubmitForm}>
              <div className='grid grid-cols-6 gap-6'>
                <Input
                  className='col-span-6 sm:col-span-3'
                  label='Course Name'
                  name='courseName'
                  type='text'
                  errorMessage={errors.courseName?.message}
                  register={register}
                  labelClass='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  inputClass='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder='Course name'
                />
                <Input
                  className='col-span-6 sm:col-span-3'
                  label='Price'
                  name='price'
                  type='number'
                  errorMessage={errors.price?.message}
                  register={register}
                  labelClass='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                  inputClass='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                  placeholder='Course price'
                />

                <div className='col-span-6 sm:col-span-3'>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor='file_input'>
                    Upload file
                  </label>
                  <input
                    className='block w-full text-sm text-gray-900 cursor-pointer mt-4'
                    id='file_input'
                    onChange={handleFileChange}
                    type='file'
                  />
                </div>

                <div className='col-span-6 sm:col-span-3'>
                  <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white' htmlFor='file_input'>
                    {isUploadImage ? 'Uploaded' : 'Not Upload'}
                  </label>
                  <button
                    type='button'
                    onClick={handleUploadImage}
                    className='inline-flex items-center text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center'
                  >
                    <svg
                      className='w-4 h-4 mr-2 -ml-1'
                      fill='currentColor'
                      viewBox='0 0 20 20'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.977A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z' />
                      <path d='M9 13h2v5a1 1 0 11-2 0v-5z' />
                    </svg>
                    Upload picture
                  </button>
                </div>

                <div className='col-span-12 sm:col-span-6'>
                  <label htmlFor='message' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                    Title
                  </label>
                  <textarea
                    id='message'
                    rows={4}
                    {...register('title')}
                    className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                    placeholder='Write your thoughts here...'
                    defaultValue={''}
                  />
                  <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errors.title?.message}</div>
                </div>
              </div>
            </form>
          </div>
          {/* Modal footer */}
          <div className='items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700'>
            <button
              className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
              type='button'
              onClick={handleSubmitForm}
            >
              Save all
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
