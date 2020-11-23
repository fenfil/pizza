import { useSelector, shallowEqual } from "react-redux";
import { RootState } from "../store";
import { Pizza } from "../interfaces/Pizza";
import { Currency } from "../constants/currency";

interface Selector {
  pizzas: Pizza[];
  currency: Currency;
  multiplier: number;
}

function usePizzaSelector() {
  return useSelector<RootState, Selector>(
    state => ({
      pizzas: state.pizza.pull.filter(pizza => pizza.order),
      currency: state.rates.currency,
      multiplier:
        state.rates.currency === Currency.USD ? 1 : state.rates.eurPerUsd
    }),
    shallowEqual
  );
}

export default usePizzaSelector;
