import { createSlice } from "@reduxjs/toolkit";
import {
  RecordsSliceInterface,
  AddRecordInterface,
  AddRecordResponse,
  AsyncThunkConfig,
  RemoveRecordInterface,
} from "../interfaces/ReduxInterfaces";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { RECORD_EXPENSE_URL, REMOVE_EXPENSE_URL } from "../constants";

const token = localStorage.getItem('token')

export const addRecord = createAsyncThunk<
  AddRecordResponse,
  AddRecordInterface,
  AsyncThunkConfig
>(
  "recordsSlice/addRecord",
  async ({ data, formType }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${RECORD_EXPENSE_URL}/${formType}`,
        data,
        { headers: { Authorization: token } }
      );
      console.log(response.data);

      return response.data.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "An error occurred"
      );
    }
  }
);

export const removeRecord = createAsyncThunk<
  AddRecordResponse,
  RemoveRecordInterface,
  AsyncThunkConfig
>("recordsSlice/removeRecord", async ({_id}, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${REMOVE_EXPENSE_URL}/${_id}`, {
      headers: { Authorization: token },
    });
    console.log(response.data);
    return response.data.data;
  } catch (error: any) {
    console.log(error.response)
    return rejectWithValue(
      error.response?.data?.message || "An error occurred"
    );
  }
});

const recordsSlice = createSlice({
  name: "records",
  initialState: {
    status: "idle",
    error: null,
    page: 1,
    allRecords: [],
    mainRecords: {
      total_balance: 0,
      highest_income_value: 0,
      highest_expense_value: 0,
    },
    incomeRecords: {
      business: 0,
      fc: 0,
      gifts: 0,
      mf: 0,
      other: 0,
      salary: 0,
      stocks: 0,
    },
    expenseRecords: {
      entertainment: 0,
      food: 0,
      groceries: 0,
      healthcare: 0,
      home: 0,
      luxury: 0,
      travel: 0,
    },
  } as RecordsSliceInterface,
  reducers: {
    fetchRecordsDetails: (state, action) => {
      state.allRecords = [...state.allRecords, action.payload.records];

      const payload = action.payload.userData;
      state.mainRecords = {
        total_balance: payload.total_balance,
        highest_income_value: payload.highest_income_value,
        highest_expense_value: payload.highest_expense_value,
      };

      Object.keys(state.incomeRecords).forEach((key) => {
        const incomeKey = `total_income_${key}` as keyof typeof payload;
        if (incomeKey in payload) {
          state.incomeRecords[key as keyof typeof state.incomeRecords] =
            payload[incomeKey];
        }
      });
      Object.keys(state.expenseRecords).forEach((key) => {
        const expenseKey = `total_expense_${key}` as keyof typeof payload;
        if (expenseKey in payload) {
          state.expenseRecords[key as keyof typeof state.expenseRecords] =
            payload[expenseKey];
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRecord.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addRecord.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const payload = action.payload;
        // state.mainRecords = {
        //   total_balance: payload.total_balance || 0,
        //   highest_income_value: payload.highest_income_value || 0,
        //   highest_expense_value: payload.highest_expense_value || 0,
        // };

        // Object.keys(state.incomeRecords).forEach((key) => {
        //   const incomeKey = `total_income_${key}` as keyof typeof payload;
        //   if (incomeKey in payload) {
        //     state.incomeRecords[key as keyof typeof state.incomeRecords] =
        //       payload[incomeKey];
        //   }
        // });

        // Object.keys(state.expenseRecords).forEach((key) => {
        //   const expenseKey = `total_expense_${key}` as keyof typeof payload;
        //   if (expenseKey in payload) {
        //     state.expenseRecords[key as keyof typeof state.expenseRecords] =
        //       payload[expenseKey];
        //   }
        // });
      })

      .addCase(addRecord.rejected, (state, action: any) => {
        state.status = "rejected";
        state.error = action.payload.error?.response?.data?.message;
      })
      .addCase(removeRecord.pending, (state) => {
        state.status = "pending";
      })
      .addCase(removeRecord.fulfilled, (state, action) => {
        state.status = "fulfilled";
        const payload = action.payload;
        // state.mainRecords = {
        //   total_balance: payload.total_balance || 0,
        //   highest_income_value: payload.highest_income_value || 0,
        //   highest_expense_value: payload.highest_expense_value || 0,
        // };

        // Object.keys(state.incomeRecords).forEach((key) => {
        //   const incomeKey = `total_income_${key}` as keyof typeof payload;
        //   if (incomeKey in payload) {
        //     state.incomeRecords[key as keyof typeof state.incomeRecords] =
        //       payload[incomeKey];
        //   }
        // });

        // Object.keys(state.expenseRecords).forEach((key) => {
        //   const expenseKey = `total_expense_${key}` as keyof typeof payload;
        //   if (expenseKey in payload) {
        //     state.expenseRecords[key as keyof typeof state.expenseRecords] =
        //       payload[expenseKey];
        //   }
        // });
      })

      .addCase(removeRecord.rejected, (state, action: any) => {
        state.status = "rejected";
        state.error = action.payload.error?.response?.data?.message;
      });
  },
});

export const { fetchRecordsDetails } = recordsSlice.actions;

export default recordsSlice.reducer;
