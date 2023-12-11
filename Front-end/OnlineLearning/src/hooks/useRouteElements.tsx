import { useContext } from 'react'
import { useRoutes, Outlet, Navigate } from 'react-router-dom'
import Banner from 'src/components/Banner/Banner'
import path from 'src/constants/path'
import { Role } from 'src/constants/role'
import { AppContext } from 'src/contexts/app.context'
import MainLayout from 'src/layouts/MainLayout'
import RegisterLayout from 'src/layouts/RegisterLayout'
import CourseDetails from 'src/pages/CourseDetails'
import CourseList from 'src/pages/CourseList'
import CourseManagement from 'src/pages/CourseManagement'
import LessonList from 'src/pages/CourseManagement/LessonList'
import Login from 'src/pages/Login'
import NotFound from 'src/pages/NotFound'
import Profile from 'src/pages/Profile'
import Register from 'src/pages/Register'
import UserManagement from 'src/pages/UserManagement'

const ProtectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

const RejectedRoute = () => {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to={'/'} />
}

const AdminRoute = () => {
  const { profile } = useContext(AppContext)
  return profile?.role === Role[Role.ADMIN] ? <Outlet /> : <Navigate to={'/'} />
}

const AdminUserRoute = () => {
  const { profile } = useContext(AppContext)
  const isHavePermission = profile?.role === Role[Role.ADMIN] || profile?.role === Role[Role.ADMIN_USER]
  return isHavePermission ? <Outlet /> : <Navigate to={'/'} />
}

const AdminCourseRoute = () => {
  const { profile } = useContext(AppContext)
  const isHavePermission = profile?.role === Role[Role.ADMIN] || profile?.role === Role[Role.ADMIN_COURSE]
  return isHavePermission ? <Outlet /> : <Navigate to={'/'} />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '/',
      index: true,
      element: (
        <MainLayout>
          <Banner />
          <CourseList />
        </MainLayout>
      )
    },
    {
      path: path.courseDetails,
      element: (
        <MainLayout>
          <CourseDetails />
        </MainLayout>
      )
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
              <Profile />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <AdminUserRoute />,
      children: [
        {
          path: path.user_management,
          element: (
            <MainLayout>
              <UserManagement />
            </MainLayout>
          )
        },
        {
          path: path.course_management,
          element: (
            <MainLayout>
              <CourseManagement />
            </MainLayout>
          )
        },
        {
          path: path.lesson_management,
          element: (
            <MainLayout>
              <LessonList />
            </MainLayout>
          )
        }
      ]
    },
    {
      path: '*',
      element: <NotFound />
    }
  ])

  return routeElements
}
