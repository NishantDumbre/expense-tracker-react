import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import AuthPage from "../pages/AuthPage";
import Dashboard from "../pages/Dashboard";
import Profile from "../pages/Profile";
import { useSelector } from "react-redux";
import { StoreState } from "../utils/redux/appStore";

const Body = () => {
  const token = useSelector((store: StoreState) => store.user.token);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: token ? <Navigate to="/dashboard" /> : <Navigate to="/auth" />,
    },
    {
      path: "/auth",
      element: token ? <Navigate to="/dashboard" /> : <AuthPage />,
    },
    {
      path: "/dashboard",
      element: token ? <Dashboard /> : <Navigate to="/auth" />,
    },
    {
      path: "/profile",
      element: token ? <Profile /> : <Navigate to="/auth" />,
    },
    // {
    //     path:'/premium',
    //     element: token ? <Premium /> : <Navigate to="/auth" />
    // },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Body;
