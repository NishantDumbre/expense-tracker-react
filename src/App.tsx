import React from "react";
import {createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom'

import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import Suspense from "./UI/Suspense";
import RootLayout from "./pages/RootLayout";
import Profile from "./pages/Profile";

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<AuthPage />,
  },
  {
    path:'/home',
    element:<RootLayout />,
    children:[
      {
        index: true, 
        element: <Navigate to="/home/dashboard" replace />
      },
      {
        path:'/home/dashboard',
        element:<Dashboard />
      },
      {
        path:'/home/profile',
        element:<Profile />
      }
    ]
  }

])

function App() {
  return (
      <RouterProvider router={appRouter} />
  );
}

export default App;



