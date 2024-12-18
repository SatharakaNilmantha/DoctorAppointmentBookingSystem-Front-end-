import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import './index.css'
import App from './App.jsx'
import About from './pages/AboutPage/AboutPage.jsx'
import Service from './pages/ServicePage/ServicePage.jsx';
import Department from './pages/DepartmentPage/DepartmentPage.jsx'
import Doctors from './pages/DoctorsPage/DoctorsPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },

  {
    path: "/about",
    element: <About/>,
  },
  {
    path: "/service",
    element: <Service/>,
  },
  {
    path: "/department",
    element: <Department/>,
  },
  {
    path: "/doctors",
    element: <Doctors/>,
  },

]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
        <RouterProvider router={router} />
  </StrictMode>,
)
