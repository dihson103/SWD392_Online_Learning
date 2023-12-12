const path = {
  login: '/login',
  register: '/register',
  profile: '/profile/:username',
  courseDetails: 'courses/:nameId',
  user_management: '/admin/users',
  course_management: '/admin/courses',
  lesson_management: '/admin/courses/:courseId/lessons',
  session_management: '/admin/lessons/:lessonId/sessions'
}

export default path
