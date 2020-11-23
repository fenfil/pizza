import React, { SyntheticEvent } from "react";
import "./styles.css";
import { Pizza as iPizza } from "../../interfaces/Pizza";
import { currencyToDisplayName } from "../../utils/sanitizers";
import { Currency } from "../../constants/currency";
import { formatMoney } from "../../utils/format";

const Pizza: React.FC<{
  data: iPizza;
  currency: Currency;
  multiplier: number;
  order(e: SyntheticEvent<HTMLElement>): void;
}> = ({ data, order, currency, multiplier }) => {
  return (
    <div className="pizza">
      <img src={data.url} alt={data.title} className="pizza_img" />
      <p className="pizza_price">
        {formatMoney(data.price * multiplier)} {currencyToDisplayName(currency)}
      </p>
      <p className="pizza_title">{data.title}</p>
      <button className="btn" onClick={order} data-id={data.id}>
        Order
      </button>
    </div>
  );
};

export default Pizza;
