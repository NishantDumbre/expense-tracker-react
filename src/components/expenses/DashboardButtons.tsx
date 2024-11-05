import React, { useState } from "react";
import Modal from "../../UI/Modal";
import ExpenseForm from "./ExpenseForm";
import { useSelector } from "react-redux";
import { StoreState } from "../../utils/redux/appStore";

const DashboardButtons = () => {
  const [showForm, setShowForm] = useState(false);
  const [formType, setFormType] = useState<string | null>(null);
  const data = useSelector((store: StoreState) => store.records);

  const toggleForm = (type: string | null) => {
    setFormType(type);
    setShowForm((prevState) => !prevState);
  };

  return (
    <div className=" p-5 rounded-lg shadow-md w-4/5 bg-formBg ">
      <h1 className="text-2xl my-5 text-center">Current Balance:</h1>
      <p
        className={`text-center text-2xl ${
          data.mainRecords.total_balance >= 0
            ? "text-formBorder"
            : "text-primaryButton"
        }`}
      >
        {data.mainRecords.total_balance}
      </p>
      <div className="mt-10 mb-5 flex justify-around">
        <button
          className="p-5  bg-formBorder shadow-lg rounded-md text-lg block hover:bg-primaryButton-hover active:bg-primaryButton-active active:shadow-none"
          onClick={() => toggleForm("INCOME")}
        >
          Add income
        </button>
        <button
          className="p-5  bg-primaryButton shadow-lg rounded-md text-lg block hover:bg-primaryButton-hover active:bg-primaryButton-active active:shadow-none"
          onClick={() => toggleForm("EXPENSE")}
        >
          Add expense
        </button>
        {showForm && (
          <Modal onClick={() => toggleForm(null)}>
            <ExpenseForm
              onCloseForm={() => toggleForm(null)}
              formType={formType}
            />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default DashboardButtons;
