import { combineReducers } from "@reduxjs/toolkit";
import userReducer from "./usersSlice";
import inProgressReduver from "./inProgressSlice";
import paymentReducer from "./paymentSlice";

const rootReducer = combineReducers({
  usersReducer: userReducer,
  paymentReducer: paymentReducer,
  inProgressReducer: inProgressReduver,
});

export default rootReducer;
