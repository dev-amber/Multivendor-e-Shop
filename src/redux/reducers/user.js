import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    // Request
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
      state.error = null; // clear previous errors
    })

    // Success
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload.user;   // ✅ save user
      state.token = action.payload.token; // ✅ save token
      state.error = null;
    })

    // Fail
    .addCase("LoadUserFail", (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to load user";
      state.isAuthenticated = false;
      state.user = null;   // ✅ clear user
      state.token = null;  // ✅ clear token
    })

    // Clear Errors
    .addCase("ClearErrors", (state) => {
      state.error = null;
    })

    // Logout
    .addCase("LogoutSuccess", (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    });
});
