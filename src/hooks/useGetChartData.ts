import { useSelector } from "react-redux";
import { StoreState } from "../utils/redux/appStore";

const useGetChartData = () => {
  const data = useSelector((store: StoreState) => store.records);

  const getChartData = async () => {
    const expenseChartData: { expense: string; chardonay: number }[] = [];
    const incomeChartData: { income: string; syrah: number }[] = [];

    type IncomeKeys = keyof typeof data.incomeRecords;
    type ExpenseKeys = keyof typeof data.expenseRecords;

    (Object.keys(data.incomeRecords) as IncomeKeys[]).forEach((income) => {
      const obj = {
        income: income,
        syrah: Number(data.incomeRecords[income]),
      };
      incomeChartData.push(obj);
    });

    (Object.keys(data.expenseRecords) as ExpenseKeys[]).forEach((expense) => {
      const obj = {
        expense: expense,
        chardonay: data.expenseRecords[expense],
      };
      expenseChartData.push(obj);
    });

    const test = incomeChartData.map((data) => {
      return JSON.stringify(data);
    });

    return { incomeChartData, expenseChartData };
  };

  return getChartData;
};

export default useGetChartData;
