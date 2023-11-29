import { useState } from 'react'
import { LessonsResponse } from 'src/types/lesson.type'
import SessionList from './SessionList'

interface PropsType {
  lessonsData: LessonsResponse | undefined
}

export default function Lessons({ lessonsData }: PropsType) {
  const [indexActive, setIndexActive] = useState<number>(-1)

  const handleClick = (index: number) => () => {
    setIndexActive(index)
  }

  return (
    <div id='accordion-open' data-accordion='open' className='mt-5 mb-5'>
      {lessonsData &&
        lessonsData.data?.map((lesson, index) => (
          <div key={lesson.id}>
            <h2>
              <button
                type='button'
                className='flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                data-accordion-target={`#accordion-open-body-${index}`}
                aria-expanded={index === indexActive}
                aria-controls={`accordion-open-body-${index}`}
                onClick={handleClick(index)}
              >
                <span className='flex items-center'>
                  <svg
                    className='w-5 h-5 mr-2 shrink-0'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    {/* SVG path here */}
                  </svg>{' '}
                  {lesson.title}
                </span>
                <svg
                  data-accordion-icon
                  className={`w-3 h-3 rotate-180 shrink-0 ${index === indexActive ? 'rotate-180' : ''}`}
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 10 6'
                >
                  {/* SVG path here */}
                </svg>
              </button>
            </h2>
            <div className={`${index === indexActive ? 'block' : 'hidden'}`} id={`accordion-open-body-${index}`}>
              <SessionList lessonId={lesson.id} />
            </div>
          </div>
        ))}
    </div>
  )
}
