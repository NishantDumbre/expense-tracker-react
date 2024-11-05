export interface UserSliceInterface {
  token: string | null;
  verified: boolean;
  premium: boolean;
  details: {
    name: string;
    email: string;
    profileUrl: string;
  };
}

export interface RecordsSliceInterface {
  status: string,
  error: null | string,
  page: number,
  allRecords: [];
  mainRecords: {
    total_balance: number;
    highest_income_value: number;
    highest_expense_value: number;
  };
  incomeRecords: {
    business: number;
    fc: number;
    gifts: number;
    mf: number;
    other: number;
    salary: number;
    stocks: number;
  };
  expenseRecords: {
    entertainment: number;
    food: number;
    groceries: number;
    healthcare: number;
    home: number;
    luxury: number;
    travel: number;
  };
}

export interface AddRecordInterface {
  data: { [key: string]: any };
  formType: string | null;
  token: string | null;
}

export interface AddRecordResponse {
  total_balance: number;
  highest_income_value: number;
  highest_expense_value: number;
  [key: string]: any;
}

export interface AsyncThunkConfig {
  rejectValue: string;
}