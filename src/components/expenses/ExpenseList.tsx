import React from "react";
import Expenseitem from "./Expenseitem";

const ExpenseList = () => {
  return (
    <div className="mt-8 p-5 mb-28 rounded-lg shadow-md w-4/5 bg-formBg flex flex-col justify-center items-center">
      <h1 className="text-2xl my-5 text-center">Your history</h1>
      <ul className="my-10 w-11/12 p-5 rounded-lg shadow-lg border border-solid border-formBorder flex justify-evenly items-center flex-wrap">
        <Expenseitem />
        
        
      </ul>
    </div>
  );
};

export default ExpenseList;
