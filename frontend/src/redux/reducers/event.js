import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  allEvents: [],
  success: false,
  error: null,
};

export const eventReducer = createReducer(initialState, (builder) => {
  builder

    // Create event
    .addCase("eventCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("eventCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.allEvents.push(action.payload); // optional safe add
    })
    .addCase("eventCreateFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Get shop events
    .addCase("getAlleventsShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAlleventsShopSuccess", (state, action) => {
      state.isLoading = false;
      state.allEvents = action.payload;   // ✅ FIXED
    })
    .addCase("getAlleventsShopFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Delete event
    .addCase("deleteeventRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteeventSuccess", (state, action) => {
      state.isLoading = false;   // ❌ FIXED (you had true)
      state.message = action.payload;
    })
    .addCase("deleteeventFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Get all events
    .addCase("getAlleventsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAlleventsSuccess", (state, action) => {
      state.isLoading = false;
      state.allEvents = action.payload;   // ✔ correct
    })
    .addCase("getAlleventsFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // Clear errors
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});