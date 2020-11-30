import React, { useState, useEffect } from "react";
import "./styles.css";
import useRatesSelector from "../../hooks/useRatesSelector";
import { Pizza } from "../../interfaces/Pizza";
import api from "../../utils/api";

type OrderHistory = Pizza[][];

const History: React.FC = () => {
  const [orderId, setOrderId] = useState<number | null>(null);
  const [data, setData] = useState<OrderHistory>([]);
  const { currency, multiplier } = useRatesSelector();

  useEffect(() => {
    api
      .get<OrderHistory>("/history")
      .then(res => {
        console.log(res.data);

        setData(res.data);
        if (res.data.length) setOrderId(0);
      })
      .catch(console.error);
  }, []);

  if (!data[orderId as number])
    return (
      <div className="history">
        <h4>You haven't ordered anything yet</h4>
      </div>
    );

  return (
    <div className="history">
      <div>
        <label>
          Order Id
          <select
            value={orderId as number}
            onChange={e => setOrderId(+e.target.value)}
            className="history_order-selector"
          >
            {data.map((pizzas, id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </label>
      </div>
      {data[orderId as number].map(pizza => (
        <div key={pizza.id} className="flex__default">
          <img src={pizza.url} alt={pizza.title} className="history_img" />
          <p className="history_title">{pizza.title}</p>
          <p className="history_amount">{pizza.order}</p>
        </div>
      ))}
    </div>
  );
};

export default History;
