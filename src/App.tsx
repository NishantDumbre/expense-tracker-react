import React from "react";
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import AuthPage from "./pages/AuthPage";

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<AuthPage />,
    errorElement:<h1>Page doesn't exist</h1>
  }
])

function App() {
  return (
    <RouterProvider router={appRouter} />
  );
}

export default App;



