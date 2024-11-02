import { createSlice } from "@reduxjs/toolkit";
import { UserSliceInterface } from "../interfaces/ReduxInterfaces";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: null,
  } as UserSliceInterface,
  reducers: {
    addUser: (state, action) => {
      state.token = action.payload;
    },
    removeUser: (state, action) => {
      state.token = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
