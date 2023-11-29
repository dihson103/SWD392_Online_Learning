import { useQuery } from '@tanstack/react-query'
import { getSessionsByLesson } from 'src/apis/session.api'

interface PropsType {
  lessonId: number
}

export default function SessionList({ lessonId }: PropsType) {
  const { data } = useQuery({
    queryKey: ['sessions', lessonId],
    queryFn: () => getSessionsByLesson(lessonId)
  })

  return (
    <div className='p-5 border border-b-0 border-gray-200 dark:border-gray-700 dark:bg-gray-900'>
      {data?.data.data?.map((session, index) => (
        <div key={session.id}>
          <p className='mb-2 text-gray-500 dark:text-gray-400'>{session.sessionName}</p>
          {data?.data.data?.length == index + 1 || <div className='w-full h-px bg-gray-200 mb-2'></div>}
        </div>
      ))}
    </div>
  )
}
