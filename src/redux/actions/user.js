// userReducer.js + loadUser.js
import { createReducer } from "@reduxjs/toolkit";
import axios from "axios";
import { server } from "../../server";

// ✅ Initial state
const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
};

// ✅ Reducer
export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user; // ✅ only save user
      state.error = null;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    })
    .addCase("ClearErrors", (state) => {
      state.error = null;
    });
});

// ✅ Thunk action
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });

    const { data } = await axios.get(`${server}/user/getUser`, {
      withCredentials: true, // important for cookies
    });

    console.log("✅ loadUser response:", data); // debug log

    dispatch({
      type: "LoadUserSuccess",
      payload: { user: data.user },
    });
  } catch (error) {
    console.error("❌ loadUser error:", error.response?.data || error.message);

    dispatch({
      type: "LoadUserFail",
      payload: error.response?.data?.message || "Something went wrong",
    });
  }
};
