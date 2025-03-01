import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './layout/Auth/AuthLayout'
import { Provider } from 'react-redux';
import { store } from './store/store'
import Home from './pages/Home/Home'
import Layout from './layout/Menu/Layout'
import Login from './pages/Login/Login'

const router = createBrowserRouter([
  {
    path: '/',
    element:<Layout/>,
    children: [
      {
        path: '/',
        element: <Home />
      }
    ]
  },
  {
		path: '/authapi',
		element: <AuthLayout />,
		children: [
			{
				path: 'login',
				element: <Login />
			},
			// {
			// 	path: 'register',
			// 	element: <Register />
			// }
		]
	},

])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
  </StrictMode>,
)
