import React from "react";
import "./styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Pizza as iPizza } from "../../interfaces/Pizza";
import Pizza from "../Pizza";
import usePizzaOrderer from "../../hooks/usePizzaOrderer";
import { Currency } from "../../constants/currency";
import useRatesSelector from "../../hooks/useRatesSelector";

const PizzaPull: React.FC = () => {
  const pull = useSelector<RootState, iPizza[]>(state => state.pizza.pull);
  const { currency, multiplier } = useRatesSelector();
  const { order } = usePizzaOrderer();

  return (
    <div className="pizzaPull">
      {pull.map(pizza => (
        <div key={pizza.id}>
          <Pizza
            data={pizza}
            order={order}
            currency={currency}
            multiplier={multiplier}
          />
        </div>
      ))}
    </div>
  );
};

export default PizzaPull;
