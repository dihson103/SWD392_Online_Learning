import Course from 'src/components/Course/Course'
import { useQuery } from '@tanstack/react-query'
import { getCoursesActive } from 'src/apis/course.api'
import { Course as CourseType } from 'src/types/course.type'

export default function CourseList() {
  const { data } = useQuery({
    queryKey: ['courses'],
    queryFn: getCoursesActive
  })

  const courses: CourseType[] | undefined = data?.data.data

  console.log(courses)

  return (
    <>
      <div>
        <div className='text-center p-10'>
          <h1 className='font-bold text-4xl mb-4 font-serif italic text-red-500'>Study, study more, study forever</h1>
          <h1 className='text-3xl font-mono'>Our new courses</h1>
        </div>
        <section
          id='Projects'
          className='w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5'
        >
          {courses?.map((course) => (
            <Course
              key={course.id}
              image={course.image}
              courseName={course.courseName}
              courseId={course.id}
              price={course.price}
              priceWhenSale={course.price}
            />
          ))}
        </section>
        <div className='text-center p-5'>
          <button
            type='button'
            className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-2xl px-5 py-2.5 text-center mr-2 mb-2'
          >
            Go to our courses list
          </button>
        </div>
      </div>
    </>
  )
}
