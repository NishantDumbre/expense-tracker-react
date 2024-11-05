import React from "react";
import { BACKGROUND_IMG } from "../utils/constants";
import { ToastContainer } from "react-toastify";

import DashboardButtons from "../components/expenses/DashboardButtons";
import ExpenseList from "../components/expenses/ExpenseList";

const Dashboard = () => {
  return (
    <>
      <div className=" w-screen h-screen top-0 left-0 absolute -z-10">
        <img
          src={BACKGROUND_IMG}
          alt="Background Image"
          className="fixed  object-cover"
        />
      </div>
      <div className="w-full pt-32 flex flex-wrap justify-center">
        <DashboardButtons />
        <ExpenseList />
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        className="transform -translate-x-1/2 -translate-y-24 z-30 relative"
      />
    </>
  );
};

export default Dashboard;
