import BoardScreen from '@/screens/board'
import ProjectScreen from '@/screens/project'
import ProjectListScreen from '@/screens/project-list'
import TaskScreen from '@/screens/task'
import { Navigate, RouteObject, useRoutes } from 'react-router'

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to={'/projects'} />
  },
  {
    path: '/projects',
    element: <ProjectListScreen />
  },
  {
    path: '/projects/:projectId/*',
    element: <ProjectScreen />,
    children: [
      {
        path: '',
        element: <BoardScreen />
      },
      {
        path: 'board',
        element: <BoardScreen />
      },
      {
        path: 'task',
        element: <TaskScreen />
      }
    ]
  }
]

export default () => useRoutes(routes)
