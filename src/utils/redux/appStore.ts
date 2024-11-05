import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import recordReducer from "./recordsSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    records: recordReducer
  },
});

export type StoreState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch;



export default appStore;

