import React, { useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  EXPENSE_IMAGES,
  INCOME_IMAGES,
  RECORD_EXPENSE_URL,
} from "../../utils/constants";
import { ExpenseFormProps } from "../../utils/interfaces/DashboardInterface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, StoreState } from "../../utils/redux/appStore";
import { addRecord } from "../../utils/redux/recordsSlice";

const ExpenseForm: React.FC<ExpenseFormProps> = ({ formType, onCloseForm }) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const moneyRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
  const notify = (note: string) => toast(note);
  const token = useSelector((store: StoreState) => store.user.token);
  const dispatch = useDispatch<AppDispatch>()

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(false);
    if (
      !titleRef.current?.value ||
      !descriptionRef.current?.value ||
      !moneyRef.current?.value
    ) {
      console.log(true);
      notify("Please fill all fields");
    }

    const obj = {
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
      money: moneyRef.current?.value,
      category: categoryRef.current?.value,
      date: new Date(),
    };
    console.log(obj.date)

    try {
      const message = formType === "INCOME" ? "Income" : "Expense";

      await dispatch(addRecord({ data: obj, formType, token })).unwrap();
      notify(`Added ${message}`);

      onCloseForm();
    } catch (error) {
      console.log(error);
      notify("Got an error");
    }
  };

  return (
    <div className="bg-formBg w-full flex justify-center p-3">
      <form
        className="flex flex-col items-center w-full border border-solid border-formBorder"
        onSubmit={handleFormSubmit}
      >
        <h1 className="text-center text-xl font-bold my-4">
          {formType === "INCOME" ? "Income" : "Expense"}
        </h1>
        <input
          className="rounded-md w-1/2 block p-2 my-2 bg-lightGray"
          placeholder="Title"
          ref={titleRef}
        />
        <textarea
          className="rounded-md w-1/2 p-2 my-2 bg-lightGray"
          placeholder="Description"
          ref={descriptionRef}
        ></textarea>
        <input
          className="rounded-md w-1/2 block p-2 my-2 bg-lightGray"
          type="number"
          placeholder="Price"
          ref={moneyRef}
        />
        <select
          className="rounded-md w-1/3 block p-2 my-2 bg-lightGray"
          ref={categoryRef}
        >
          {(formType === "EXPENSE" ? EXPENSE_IMAGES : INCOME_IMAGES).map(
            (expense) => {
              return (
                <option key={expense.name}>
                  {expense.name.charAt(0).toUpperCase() + expense.name.slice(1)}
                </option>
              );
            }
          )}
        </select>
        <button
          type="submit"
          className="p-2 my-2 bg-formBorder shadow-lg rounded-md text-lg block hover:bg-primaryButton-hover active:bg-primaryButton-active active:shadow-none"
        >
          Record {formType === "INCOME" ? "Income" : "Expense"}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
