import React, { SyntheticEvent } from "react";
import "./styles.css";
import { Pizza as iPizza } from "../../interfaces/Pizza";
import { formatMoney } from "../../utils/format";

const MinicartPizza: React.FC<{
  data: iPizza;
  multiplier: number;
  order(e: SyntheticEvent<HTMLElement>): void;
  disorder(e: SyntheticEvent<HTMLElement>): void;
}> = ({ data, multiplier, order, disorder }) => {
  return (
    <div className="minicartpizza">
      <img src={data.url} alt={data.title} className="minicartpizza_img" />
      <div className="minicartpizza_info">
        <div>
          <p className="minicartpizza_title">{data.title}</p>
        </div>
        <div className="flex__default">
          <div className="flex__default">
            <button onClick={disorder} data-id={data.id}>
              -
            </button>
            <span className="minicartpizza_input">{data.order}</span>
            <button onClick={order} data-id={data.id}>
              +
            </button>
          </div>
          <span className="minicartpizza_price">
            {formatMoney(data.price * multiplier * data.order)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MinicartPizza;
