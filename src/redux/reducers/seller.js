import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  seller: null,           // ✅ Correct entity for sellers
  token: null,
  isAuthenticated: false,
  isLoading: false,       // ✅ Consistent naming
  error: null,
};

export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    // ===== Load Seller Request =====
    .addCase("LoadSellerRequest", (state) => {
      state.isLoading = true;
      state.error = null;
    })

    // ===== Load Seller Success =====
    .addCase("LoadSellerSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.isLoading = false;
      state.seller = action.payload.seller; // ✅ Store seller info
      state.token = action.payload.token;   // ✅ Store token
      state.error = null;
    })

    // ===== Load Seller Fail =====
    .addCase("LoadSellerFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload || "Failed to load seller";
      state.isAuthenticated = false;
      state.seller = null;
      state.token = null;
    })

    // ===== Clear Errors =====
    .addCase("ClearErrors", (state) => {
      state.error = null;
    })

    // ===== Logout Success =====
    .addCase("LogoutSuccess", (state) => {
      state.seller = null;         // ✅ Correct key cleared
      state.token = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    });
});
