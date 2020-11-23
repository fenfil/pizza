import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import "../utils/api";
import api from "../utils/api";
import { Currency } from "../constants/currency";
import { LS_CURRENCY } from "../constants/localStorage";
import { validateOrder, validateCurrency } from "../utils/validation";
import { localStorageToCurrency } from "../utils/sanitizers";

export interface PizzaState {
  currency: Currency;
  eurPerUsd: number;
}

export const loadSavedCurrency = createAsyncThunk<Currency>(
  "pizza/loadSavedCurrency",
  async () => {
    const currency = localStorageToCurrency(localStorage.getItem(LS_CURRENCY));
    if (!validateCurrency(currency)) return Promise.reject();
    return currency as Currency;
  }
);

export const loadRates = createAsyncThunk<number>(
  "pizza/loadRates",
  async () => {
    const res = await api.get<{
      eurPerUsd: number;
    }>("/rates");
    return res.data.eurPerUsd;
  }
);

const initialState: PizzaState = {
  eurPerUsd: 0.9,
  currency: Currency.USD
};

const slice = createSlice({
  name: "rates",
  initialState,
  reducers: {
    toggleCurrency(state) {
      state.currency =
        state.currency === Currency.USD ? Currency.EUR : Currency.USD;
    }
  },
  extraReducers(builder) {
    builder.addCase(loadRates.fulfilled, (state, { payload }) => {
      state.eurPerUsd = payload;
    });
    builder.addCase(loadSavedCurrency.fulfilled, (state, { payload }) => {
      state.currency = payload;
    });
  }
});

export const { toggleCurrency } = slice.actions;
export default slice.reducer;
