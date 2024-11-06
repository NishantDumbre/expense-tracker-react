import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../utils/redux/appStore";
import useGetChartData from "../hooks/useGetChartData";

import { BestIncome, ChartData, WorstExpense } from "../utils/interfaces/PremiumInterface";
import { BACKGROUND_IMG } from "../utils/constants";
import Graph from "../components/Graph";

const Premium = () => {
  const getChartData = useGetChartData();
  const [data, setData] = useState<ChartData | null>(null);
  const [showIncomeGraph, setShowIncomeGraph] = useState<boolean>(true);
  const [bestIncome, setBestIncome] = useState<BestIncome>();
  const [worstExpense, setWorstExpense] = useState<WorstExpense>();
  const recordsData = useSelector((store: StoreState) => store.records);

  useEffect(() => {
    const fetchData = async () => {
      const chartData = await getChartData();
      setData(chartData);
    };

    const findBestRecords = () => {
      let maxIncomeKey = "";
      let maxIncomeValue = 0;
      for (const [key, value] of Object.entries(recordsData.incomeRecords)) {
        if (value > maxIncomeValue) {
          maxIncomeValue = value;
          maxIncomeKey = key;
        }
      }

      let maxExpenseKey = "";
      let maxExpenseValue = 0;
      for (const [key, value] of Object.entries(recordsData.expenseRecords)) {
        if (value > maxExpenseValue) {
          maxExpenseValue = value;
          maxExpenseKey = key;
        }
      }
      setWorstExpense({ maxExpenseKey, maxExpenseValue });
      setBestIncome({ maxIncomeKey, maxIncomeValue });
    };

    if(!bestIncome || !worstExpense){
        findBestRecords()
    }

    if (!data) {
      fetchData();
    }
    console.log(data);
  }, [data]);

  return (
    <>
      <div className=" w-screen h-screen top-0 left-0 fixed -z-10">
        <img
          src={BACKGROUND_IMG}
          alt="Background Image"
          className="fixed  object-cover"
        />
      </div>
      <div className="h-full w-full pt-40 flex flex-col justify-center items-center">
        <Graph data={data} showIncomeGraph={showIncomeGraph} />
        <button
          className="my-5 py-2 px-3 bg-primaryButton shadow-lg rounded-md text-lg block hover:bg-primaryButton-hover active:bg-primaryButton-active active:shadow-none"
          onClick={() => setShowIncomeGraph((prev) => !prev)}
        >
          Switch Graph
        </button>
        <div className="w-9/12 shadow-lg rounded-lg p-5 bg-formBg mb-20">
          <p className="p-2 my-5 text-xl border-b-2 border-formBorder w-8/12 shadow-md mx-auto">
            Highest ever income: {recordsData.mainRecords.highest_income_value}
          </p>
          <p className="p-2 my-5 text-xl border-b-2 border-formBorder w-8/12 shadow-md mx-auto">
            Highest ever expense:{recordsData.mainRecords.highest_expense_value}
          </p>
          <p className="p-2 my-5 text-xl border-b-2 border-formBorder w-8/12 shadow-md mx-auto">
            Best income gains in: {bestIncome?.maxIncomeKey}  {bestIncome?.maxIncomeValue}
          </p>
          <p className="p-2 my-5 text-xl border-b-2 border-formBorder w-8/12 shadow-md mx-auto">
            Most expensive category: {worstExpense?.maxExpenseKey}  {worstExpense?.maxExpenseValue}
          </p>
        </div>
      </div>
    </>
  );
};

export default Premium;
