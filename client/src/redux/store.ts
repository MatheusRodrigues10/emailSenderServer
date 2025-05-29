import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import surveyReducer from "./features/surveySlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    survey: surveyReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
