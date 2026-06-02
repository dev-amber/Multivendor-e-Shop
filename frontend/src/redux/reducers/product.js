import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  products: [],
  allProducts: [],
  success: false,
  message: null,
  error: null,
};

export const productReducer = createReducer(initialState, (builder) => {
  builder

    // ================= CREATE PRODUCT =================
    .addCase("productCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("productCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.products = action.payload || [];
      state.success = true;
    })
    .addCase("productCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    // ================= GET SHOP PRODUCTS =================
    .addCase("getAllProductsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.products = action.payload || []; // ✅ FIXED
    })
    .addCase("getAllProductsShopFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // ================= DELETE PRODUCT =================
    .addCase("deleteProductRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteProductSuccess", (state, action) => {
      state.isLoading = false; // ✅ FIXED (was true)
      state.message = action.payload;
    })
    .addCase("deleteProductFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // ================= GET ALL PRODUCTS =================
    .addCase("getAllProductsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllProductsSuccess", (state, action) => {
      state.isLoading = false;
      state.allProducts = action.payload || []; // ✅ FIXED
    })
    .addCase("getAllProductsFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // ================= CLEAR ERRORS =================
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});