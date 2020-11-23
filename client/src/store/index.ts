import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { reducer as toastrReducer } from "react-redux-toastr";
import userReducer from "../slices/user";
import ratesReducer from "../slices/rates";
import pizzaReducer from "../slices/pizza";

const reducer = combineReducers({
  toastr: toastrReducer,
  user: userReducer,
  pizza: pizzaReducer,
  rates: ratesReducer
});

const store = configureStore({
  reducer
});

export type RootState = ReturnType<typeof reducer>;

export default store;
