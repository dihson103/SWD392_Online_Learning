/* eslint-disable jsx-a11y/media-has-caption */
import { useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getSessionById } from 'src/apis/session.api'
import { baseURL } from 'src/utils/http'
import { getIdFromNameId } from 'src/utils/utils'

export default function LearningPage() {
  const { nameId } = useParams()
  const sessionId = getIdFromNameId(nameId as string)
  const isIdValid = sessionId !== undefined && /^[\d+]+$/.test(sessionId)

  const navigate = useNavigate()

  const { data } = useQuery({
    queryKey: ['session', sessionId],
    queryFn: () => (isIdValid ? getSessionById(Number(sessionId)) : Promise.resolve(null))
  })

  const session = data?.data.data

  if (!session) {
    navigate('/')
    return null
  }

  return (
    <div className='mt-20 grid grid-cols-1 sm:grid-cols-10 mb-5 gap-2'>
      <div className='col-span-7'>
        <video className='w-full h-auto max-h-[600px] max-w-full' controls>
          <source src={`${baseURL}api/media/videos/${session.videoAddress}`} type='video/mp4' />
          Your browser does not support the video tag.
          {/* Add a track for captions */}
          <track label='English' kind='subtitles' srcLang='en' src='/path/to/captions.vtt' default />
        </video>
      </div>
      <div
        className='bg-blue-500 rounded-lg shadow-xl min-h-[50px] col-span-3'
        role='img'
        aria-label='Alternative Text'
      ></div>
    </div>
  )
}
