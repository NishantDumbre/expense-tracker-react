import React from "react";
import { Record } from "../../utils/interfaces/ReduxInterfaces";
import { useDispatch } from "react-redux";
import { removeRecord } from "../../utils/redux/recordsSlice";
import { toast } from "react-toastify";
import { AppDispatch } from "../../utils/redux/appStore";

interface ExpenseItemProps {
  record: Record;
}

const Expenseitem: React.FC<ExpenseItemProps> = ({ record }) => {
  const dispatch = useDispatch<AppDispatch>()
  const correctDate = record.date.split("T")[0]
  const correctType = record.type.charAt(0) + record.type.slice(1).toLowerCase()
  const notify = (note: string) => toast(note);

  const removeRecordElement = async () =>{
    try {
      const message = record.type === "INCOME" ? "Income" : "Expense";

      await dispatch(removeRecord({_id:record._id})).unwrap();

      notify(`Removed ${message}`);
      window.location.reload();

    } catch (error) {
      console.log(error);
      notify("Got an error");
    }
  }

  return (
    <li
      className=" w-5/12 inline-block my-2 py-4 border border-formBorder border-solid rounded-lg"
      id={record._id}
    >
      <div className="w-3/5 mx-auto object-contain border border-formBorder border-solid">
        {record.type === "INCOME" ? (
          <img
            src={`/assets/incomes/${record.category.toLowerCase()}.jpg`}
            alt={record.category.toLowerCase()}
          />
        ) : (
          <img
            src={`/assets/expenses/${record.category.toLowerCase()}.jpg`}
            alt={record.category.toLowerCase()}
          />
        )}
      </div>
      <div className="p-4">
        <p className="font-bold text-xl">{record.title}</p>
        <p className={`font-bold text-lg ${correctType === 'Income' ? "text-formBorder": "text-primaryButton"}`}>${record.money}</p>
        <p className={`font-bold text-lg ${correctType === 'Income' ? "text-formBorder": "text-primaryButton"}`}>{correctType}</p>
        <p className="pb-1">{correctDate}</p>
        <p className="text-lg">{record.description}</p>
      </div>
      <div className="flex justify-evenly items-center">
        <button className="p-2 px-5  bg-primaryButton shadow-lg rounded-md text-lg block hover:bg-primaryButton-hover active:bg-primaryButton-active active:shadow-none"
        onClick={removeRecordElement}>
          Delete
        </button>
        {/* <button className="p-2 px-5 bg-formBorder shadow-lg rounded-md text-lg block hover:bg-primaryButton-hover active:bg-primaryButton-active active:shadow-none">
          Edit
        </button> */}
      </div>
    </li>
  );
};

export default Expenseitem;
