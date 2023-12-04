import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useMutation } from '@tanstack/react-query'

import { Role } from 'src/constants/role'
import { User } from 'src/types/user.type'
import { UserSchema, userSchema } from 'src/utils/rules'
import Input from 'src/components/Input'
import { addUser, updateUser } from 'src/apis/user.api'
import FormStatus from 'src/constants/formStatus'

type Props = {
  handleDisplayForm: (status: FormStatus, userData: User | UserSchema) => () => void
  initialFormData: UserSchema
  formDatatState: User | UserSchema
}

export default function UserForm({ handleDisplayForm, initialFormData, formDatatState }: Props) {
  const [userRole, setUserRole] = useState<string>('USER')

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm<User | UserSchema>({
    resolver: yupResolver(userSchema)
  })

  useEffect(() => {
    setUserRole(formDatatState.role ? formDatatState.role : 'USER')
  }, [formDatatState.role, formDatatState])

  useEffect(() => {
    if (formDatatState) {
      setValue('email', formDatatState.email)
      setValue('dob', formDatatState.dob ? formDatatState.dob.substring(0, 10) : '')
      setValue('address', formDatatState.address)
      setValue('phone', formDatatState.phone)
      setValue('role', formDatatState.role)
      setValue('username', formDatatState.username)
    }
  }, [formDatatState, setValue])

  const handleSaveClick = handleSubmit((data) => {
    const checkFormDataState = formDatatState as User
    if (checkFormDataState.id) {
      const newData = { ...data, role: userRole, id: checkFormDataState.id }
      updateUserMutation.mutate(newData, {
        onSuccess(data) {
          handleDisplayForm(FormStatus.Refetch, initialFormData)()
          toast.success(data.data.message)
        },
        onError(error) {
          console.log('updateUserError', error)
        }
      })
    } else {
      addUserMutation.mutate(data, {
        onSuccess(data) {
          handleDisplayForm(FormStatus.Refetch, initialFormData)()
          toast.success(data.data.message)
        },
        onError(error) {
          console.log('addUserError', error)
        }
      })
    }
  })

  const handleRoleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = event.target.value
    setUserRole(selectedRole)
  }

  const updateUserMutation = useMutation({
    mutationFn: (body: User) => updateUser(body)
  })

  const addUserMutation = useMutation({
    mutationFn: (body: UserSchema) => addUser(body)
  })

  return (
    <div className='relative w-full h-full max-w-2xl px-4 md:h-auto'>
      <div className='relative bg-white rounded-lg shadow dark:bg-gray-800'>
        <div className='flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700'>
          <h3 className='text-xl font-semibold dark:text-white'>Edit user</h3>
          <button
            type='button'
            onClick={handleDisplayForm(FormStatus.Hidden, initialFormData)}
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
          <form onSubmit={handleSaveClick}>
            <div className='grid grid-cols-6 gap-6'>
              <Input
                className='col-span-6 sm:col-span-3'
                label='Username'
                name='username'
                type='text'
                errorMessage={errors.username?.message}
                register={register}
                labelClass='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                inputClass='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                placeholder='Username'
              />
              <Input
                className='col-span-6 sm:col-span-3'
                label='Date of birth'
                name='dob'
                type='date'
                errorMessage={errors.dob?.message}
                register={register}
                labelClass='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                inputClass='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                placeholder='Date of birth'
              />
              <Input
                className='col-span-6 sm:col-span-3'
                label='Email'
                name='email'
                type='email'
                errorMessage={errors.email?.message}
                register={register}
                labelClass='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                inputClass='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                placeholder='Email'
              />
              <Input
                className='col-span-6 sm:col-span-3'
                label='Address'
                name='address'
                type='text'
                errorMessage={errors.address?.message}
                register={register}
                labelClass='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                inputClass='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                placeholder='Address'
              />

              <Input
                className='col-span-6 sm:col-span-3'
                label='Phone number'
                name='phone'
                type='text'
                errorMessage={errors.phone?.message}
                register={register}
                labelClass='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
                inputClass='shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500'
                placeholder='Phone number'
              />

              <div className='col-span-6 sm:col-span-3'>
                <label htmlFor='role' className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Role
                </label>
                <select
                  id='role'
                  value={userRole}
                  onChange={handleRoleChange}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                >
                  {Object.keys(Role)
                    .filter((key: string) => isNaN(Number(Role[key as keyof typeof Role])))
                    .map((key: string) => (
                      <option key={Role[key as keyof typeof Role]} value={Role[key as keyof typeof Role]}>
                        {Role[key as keyof typeof Role]}
                      </option>
                    ))}
                </select>
              </div>
            </div>
          </form>
        </div>
        {/* Modal footer */}
        <div className='items-center p-6 border-t border-gray-200 rounded-b dark:border-gray-700'>
          <button
            className='text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
            type='button'
            onClick={handleSaveClick}
          >
            Save all
          </button>
        </div>
      </div>
    </div>
  )
}
