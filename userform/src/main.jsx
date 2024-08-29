import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Guest from './pages/Guest.jsx'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
const router = createBrowserRouter([
  {
    path: '/guest',
    element: <Guest />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/dashboard',
    element: <Dashboard />,
  }
  

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
