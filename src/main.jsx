import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './assets/Components/Layout/Main';
import Home from './assets/Components/Home/Home';
import Login from './assets/Components/Header/Login';
import SignUp from './assets/Components/Header/SignUp';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>
      },
      {
        path: '/login',
        element: <Login></Login>
      },
      {
        path: '/signUp',
        element: <SignUp></SignUp>
      }
    ]
  },
],{
  future: {
    v7_fetcherPersist: true,
    v7_normalizeFormMethod: true,
    v7_partialHydration: true,
    v7_relativeSplatPath: true,
    v7_skipActionErrorRevalidation: true,
  },
});
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}
     future={{
      v7_startTransition: true,
    }} />
  </StrictMode>,
)
