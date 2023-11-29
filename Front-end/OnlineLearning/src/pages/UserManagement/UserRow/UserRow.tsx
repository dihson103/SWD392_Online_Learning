import UserFormStatus from 'src/constants/userFormStatus'
import { User } from 'src/types/user.type'
import { UserSchema } from 'src/utils/rules'

interface Props {
  profile: User
  handleDisplayForm: (status: UserFormStatus, userData: User | UserSchema) => () => void
  handleDisplayConfirmDelete: (status: boolean, userId: number) => () => void
}

export default function UserRow({ profile, handleDisplayForm, handleDisplayConfirmDelete }: Props) {
  return (
    <tr className='hover:bg-gray-100 dark:hover:bg-gray-700' key={profile.id}>
      <td className='w-4 p-4'>
        <div className='flex items-center'>
          <input
            id='checkbox-1'
            aria-describedby='checkbox-1'
            type='checkbox'
            className='w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600'
          />
          <label htmlFor='checkbox-1' className='sr-only'>
            checkbox
          </label>
        </div>
      </td>
      <td className='flex items-center p-4 mr-12 space-x-6 whitespace-nowrap'>
        <img
          className='w-10 h-10 rounded-full'
          src='https://flowbite-admin-dashboard.vercel.app/images/users/neil-sims.png'
          alt='name'
        />
        <div className='text-sm font-normal text-gray-500 dark:text-gray-400'>
          <div className='text-base font-semibold text-gray-900 dark:text-white'>{profile.username}</div>
          <div className='text-sm font-normal text-gray-500 dark:text-gray-400'>{profile.email}</div>
        </div>
      </td>
      <td className='max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400'>
        {profile.role}
      </td>
      <td className='p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white'>
        {profile.dob?.substring(0, 10)}
      </td>
      <td className='p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white'>{profile.address}</td>
      <td className='p-4 text-base font-normal text-gray-900 whitespace-nowrap dark:text-white'>
        <div className='flex items-center'>Active</div>
      </td>
      <td className='p-4 space-x-2 whitespace-nowrap'>
        <button
          type='button'
          onClick={handleDisplayForm(UserFormStatus.Display, profile)}
          data-modal-toggle='edit-user-modal'
          className='inline-flex items-center text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
        >
          <svg className='w-4 h-4 mr-2' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path d='M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z' />
            <path
              fillRule='evenodd'
              d='M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'
              clipRule='evenodd'
            />
          </svg>
          Edit user
        </button>
        <button
          type='button'
          onClick={handleDisplayConfirmDelete(true, profile.id)}
          data-modal-toggle='delete-user-modal'
          className='inline-flex items-center text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2'
        >
          <svg className='w-4 h-4 mr-2' fill='currentColor' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'>
            <path
              fillRule='evenodd'
              d='M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z'
              clipRule='evenodd'
            />
          </svg>
          Delete user
        </button>
      </td>
    </tr>
  )
}
