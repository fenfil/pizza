import React, { useState, useEffect } from "react";
import "./styles.css";
import usePizzaSelector from "../../hooks/usePizzaSelector";
import CartPizza from "../CartPizza ";
import usePizzaOrderer from "../../hooks/usePizzaOrderer";
import { currencyToDisplayName } from "../../utils/sanitizers";
import { formatMoney } from "../../utils/format";
import { useDispatch } from "react-redux";
import { submitOrder } from "../../slices/pizza";
import useUserSelector from "../../hooks/useUserSelector";

const Cart: React.FC = () => {
  const dispatch = useDispatch();
  const { pizzas, currency, multiplier } = usePizzaSelector();
  const { order, disorder } = usePizzaOrderer();
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const userState = useUserSelector();

  useEffect(() => {
    setAddress(userState.address);
  }, [userState.address]);
  useEffect(() => {
    setEmail(userState.email);
  }, [userState.email]);

  const subtotal = pizzas.reduce(
    (acc, p) => acc + p.order * p.price * multiplier,
    0
  );
  const vat = subtotal * 0.3;
  const delivery = 15;

  return (
    <div className="cart">
      {pizzas.map(p => (
        <CartPizza
          data={p}
          order={order}
          disorder={disorder}
          multiplier={multiplier}
          currency={currency}
        />
      ))}
      {pizzas.length ? (
        <>
          <p className="tar">Subtotal: {formatMoney(subtotal)}</p>
          <p className="tar">VAT: {formatMoney(vat)}</p>
          <p className="tar">Delivery: {formatMoney(delivery)}</p>
          <p className="tar">
            Total: {formatMoney(subtotal + vat + delivery)}{" "}
            {currencyToDisplayName(currency)}
          </p>
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
          <button
            className="cart_order"
            onClick={() => dispatch(submitOrder())}
          >
            Submit Order
          </button>
        </>
      ) : (
        <h4>You haven't ordered any pizza</h4>
      )}
    </div>
  );
};

export default Cart;
