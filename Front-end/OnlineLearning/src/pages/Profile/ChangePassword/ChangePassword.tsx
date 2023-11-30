import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

import { userChangePassword } from 'src/apis/user.api'
import Input from 'src/components/Input'
import { ChangePasswordRequest } from 'src/types/user.type'
import { ChangePasswordSchema, changePasswordSchema } from 'src/utils/rules'

export default function ChangePassword({ username }: { username: string }) {
  const changePasswordMutation = useMutation({
    mutationFn: (body: ChangePasswordRequest) => userChangePassword(username, body)
  })
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<ChangePasswordSchema>({
    resolver: yupResolver(changePasswordSchema)
  })

  const handleChangePassword = handleSubmit((data) => {
    const body = data as ChangePasswordRequest
    changePasswordMutation.mutate(body, {
      onSuccess(data) {
        toast.success(data.data.message)
      },
      onError(error) {
        console.log('>>> change password error', error)
      }
    })
  })

  return (
    <div className='p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800'>
      <h3 className='mb-4 text-xl font-semibold dark:text-white'>Password information</h3>
      <form onSubmit={handleChangePassword} noValidate>
        <div className='grid grid-cols-6 gap-6'>
          <Input
            className='col-span-6 sm:col-span-3'
            label='Current password'
            name='oldPassword'
            type='password'
            errorMessage={errors.oldPassword?.message}
            register={register}
            labelClass='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            inputClass='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
            placeholder='••••••••'
          />
          <Input
            className='col-span-6 sm:col-span-3'
            label='New password'
            name='newPassword'
            type='password'
            errorMessage={errors.newPassword?.message}
            register={register}
            labelClass='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            inputClass='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
            placeholder='••••••••'
          />
          <Input
            className='col-span-6 sm:col-span-3'
            label='New password'
            name='confirm_password'
            type='password'
            errorMessage={errors.confirm_password?.message}
            register={register}
            labelClass='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
            inputClass='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
            placeholder='••••••••'
          />
          <div className='col-span-6 sm:col-full'>
            <button
              className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-3 py-2 text-center'
              type='submit'
            >
              Save all
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
