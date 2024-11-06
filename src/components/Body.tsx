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
import MainLayout from "../pages/MainLayout";
import VerifiedDetails from "../pages/VerifiedDetails";
import Premium from "../pages/Premium";

const Body = () => {
  const token = useSelector((store: StoreState) => store.user.token);
  const premium = useSelector((store: StoreState) => store.user.premium);

  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: token ? <MainLayout /> : <Navigate to="/auth" />,
      children: [
        {
          index: true,
          element: <Navigate to="/dashboard" />,
        },
        {
          path: "/dashboard",
          element: token ? <Dashboard /> : <Navigate to="/auth" />,
        },
        {
          path: "/profile",
          element: token ? <Profile /> : <Navigate to="/auth" />,
        },
        {
          path: "/premium",
          element: !token ? (
            <Navigate to="/auth" />
          ) : !premium ? (
            <Navigate to="/dashboard" />
          ) : (
            <Premium />
          ),
        },
        {
          path: "/verify-details",
          element: <VerifiedDetails />,
        },
      ],
    },
    {
      path: "/auth",
      element: token ? <Navigate to="/dashboard" /> : <AuthPage />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default Body;
