import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../store";
import { Currency } from "../constants/currency";

interface Selector {
  currency: Currency;
  multiplier: number;
}

function useRatesSelector() {
  return useSelector<RootState, Selector>(
    state => ({
      currency: state.rates.currency,
      multiplier:
        state.rates.currency === Currency.USD ? 1 : state.rates.eurPerUsd
    }),
    shallowEqual
  );
}

export default useRatesSelector;
