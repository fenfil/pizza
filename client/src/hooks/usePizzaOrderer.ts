import { useDispatch } from "react-redux";
import { SyntheticEvent } from "react";
import { increaseCart, decreaseCart } from "../slices/pizza";

function usePizzaOrderer() {
  const dispatch = useDispatch();

  const order = (e: SyntheticEvent<HTMLElement>) => {
    const data = e.currentTarget.dataset.id;
    if (!data) return;
    const id = parseInt(data);

    if (typeof id == "number" && !Number.isNaN(id)) {
      dispatch(increaseCart(id));
    }
  };
  const disorder = (e: SyntheticEvent<HTMLElement>) => {
    const data = e.currentTarget.dataset.id;
    if (!data) return;
    const id = parseInt(data);

    if (typeof id == "number" && !Number.isNaN(id)) {
      dispatch(decreaseCart(id));
    }
  };

  return { order, disorder };
}

export default usePizzaOrderer;
