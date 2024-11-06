export type ChartData = {
  incomeChartData: { [key: string]: number | string }[];
  expenseChartData: { [key: string]: number | string }[];
};

export interface GraphProps {
  data: ChartData | null;
  showIncomeGraph: boolean;
}

export type BestIncome = {maxIncomeKey:string, maxIncomeValue:number}
export type WorstExpense = {maxExpenseKey:string, maxExpenseValue:number}