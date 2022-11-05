import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { createBrowserRouter, RouterProvider, Route } from 'react-router-dom'
import Root from './routes/root'
import ErrorPage from './error-page'
import Login from './routes/login/login'
import Register from './routes/register/register'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Home from './routes/home/home'
import User from './routes/user/user'

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'Home',
        element: <Home />
      },
      {
        path: 'user',
        element: <User />
      }
    ]
  },
  {
    path: '/auth/login',
    element: <Login />,
    errorElement: <ErrorPage />
  },
  {
    path: '/auth/register',
    element: <Register />,
    errorElement: <ErrorPage />
  }
])

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
reportWebVitals()
