import { createSlice } from "@reduxjs/toolkit";
import { UserSliceInterface } from "../interfaces/ReduxInterfaces";

const userSlice = createSlice({
  name: "user",
  initialState: {
    token: localStorage.getItem("token"),
    verified: false,
    premium: false,
    details: {
      name: "",
      email: "",
      profileUrl: "",
    },
  } as UserSliceInterface,
  reducers: {
    addUser: (state, action) => {
      state.token = action.payload.token;
      state.details.email = action.payload.email;
    },
    removeUser: (state) => {
      state.token = null;
    },
    updateUser: (state, action) => {
      const { name, profileUrl } = action.payload;
      state.details = {
        ...state.details,
        name: name ? name : "",
        profileUrl: profileUrl ? profileUrl : "",
      };
    },
    verifyDetails: (state, action) => {
      const { verified, premium } = action.payload;
      state.verified = state.verified === verified ? state.verified : verified;
      state.premium = state.premium === premium ? state.premium : premium;
    },
    fetchUserData: (state, action) => {
      const { name, email, profileUrl, verified, premium } = action.payload;
      return state = {
        ...state,
        details: {
          name,
          email,
          profileUrl,
        },
        verified,
        premium,
      };
    },
  },
});

export const { addUser, removeUser, updateUser, verifyDetails, fetchUserData } =
  userSlice.actions;

export default userSlice.reducer;
