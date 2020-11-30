import React, { SyntheticEvent } from "react";
import "./styles.css";
import { Pizza as iPizza } from "../../interfaces/Pizza";
import { Currency } from "../../constants/currency";
import { currencyToDisplayName } from "../../utils/sanitizers";

const CartPizza: React.FC<{
  data: iPizza;
  multiplier: number;
  currency: Currency;
  order(e: SyntheticEvent<HTMLElement>): void;
  disorder(e: SyntheticEvent<HTMLElement>): void;
}> = ({ data, multiplier, order, disorder, currency }) => {
  return (
    <div className="cartpizza">
      <img src={data.url} alt={data.title} className="cartpizza_img" />
      <p className="cartpizza_title">{data.title}</p>
      <div className="cartpizza_handles flex__default">
        <button onClick={disorder} data-id={data.id}>
          -
        </button>
        <span className="cartpizza_order">{data.order}</span>
        <button onClick={order} data-id={data.id}>
          +
        </button>
      </div>
      <span className="cartpizza_price">
        {data.price * multiplier * data.order} {currencyToDisplayName(currency)}
      </span>
    </div>
  );
};

export default CartPizza;
