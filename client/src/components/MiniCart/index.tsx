import React, { useState, useRef } from "react";
import "./styles.css";
import MinicartPizza from "../MinicartPizza";
import { currencyToDisplayName } from "../../utils/sanitizers";
import { Link } from "react-router-dom";
import useOutsideClick from "../../hooks/useOutsideClick";
import usePizzaSelector from "../../hooks/usePizzaSelector";
import usePizzaOrderer from "../../hooks/usePizzaOrderer";
import { formatMoney } from "../../utils/format";

const MiniCart: React.FC = () => {
  const ref = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const { pizzas, currency, multiplier } = usePizzaSelector();

  const ordered = pizzas.reduce((acc, p) => acc + p.order, 0);
  const total = pizzas.reduce(
    (acc, p) => acc + p.order * p.price * multiplier,
    0
  );

  const { order, disorder } = usePizzaOrderer();

  useOutsideClick(ref, () => {
    if (expanded) setExpanded(false);
  });

  return (
    <div className="minicart" ref={ref}>
      <span className="minicart_title" onClick={() => setExpanded(!expanded)}>
        cart {ordered ? ordered : ""}
      </span>
      {expanded && (
        <div className="minicart_list">
          {pizzas.map(pizza => (
            <MinicartPizza
              key={pizza.id}
              data={pizza}
              order={order}
              disorder={disorder}
              multiplier={multiplier}
            />
          ))}
          <div className="flex__default">
            <p>
              Subtotal: {formatMoney(total)} {currencyToDisplayName(currency)}
            </p>
            <Link to="/cart" className="btn">
              Order
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniCart;
