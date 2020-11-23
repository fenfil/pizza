import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Pizza } from "../interfaces/Pizza";
import { pullToLocalStorage, localStorageToPull } from "../utils/sanitizers";
import { LS_PIZZA_PULL } from "../constants/localStorage";
import api from "../utils/api";
import { toastr } from "react-redux-toastr";
import { RootState } from "../store";

export interface PizzaState {
  pull: Pizza[];
}

export const loadPizzas = createAsyncThunk<{
  pull: Pizza[];
  saved: {
    order: number;
    id: number;
  }[];
}>("pizza/loadSavedOrder", async () => {
  const res = await api.get<Pizza[]>("/pizza");
  const savedPull = localStorageToPull(localStorage.getItem(LS_PIZZA_PULL));

  return {
    pull: res.data.map(p => ({ ...p, order: 0 })),
    saved: savedPull
  };
});

export const submitOrder = createAsyncThunk<void, void, { state: RootState }>(
  "pizza/submitOrder",
  async (non, { getState }) => {
    const order = getState().pizza.pull.filter(p => p.order);
    await api.post(
      "/order",
      order.map(p => ({ id: p.id, amount: p.order }))
    );
    toastr.success("Order Made!", "");
    localStorage.removeItem(LS_PIZZA_PULL);
  }
);

const initialState: PizzaState = {
  pull: [
    // {
    //   url:
    //     "https://dodopizza-a.akamaihd.net/static/Img/Products/c4f196c92ac943d59047267af46ceb5d_584x584.jpeg",
    //   price: 100,
    //   id: 1,
    //   title: "pizza 1",
    //   order: 0
    // },
    // {
    //   url:
    //     "https://dodopizza-a.akamaihd.net/static/Img/Products/c4f196c92ac943d59047267af46ceb5d_584x584.jpeg",
    //   price: 200,
    //   id: 2,
    //   title: "pizza 2",
    //   order: 0
    // },
    // {
    //   url:
    //     "https://dodopizza-a.akamaihd.net/static/Img/Products/c4f196c92ac943d59047267af46ceb5d_584x584.jpeg",
    //   price: 300,
    //   id: 3,
    //   title: "pizza 3",
    //   order: 0
    // }
  ]
};

const slice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setPull(state, { payload }: PayloadAction<Pizza[]>) {
      state.pull = payload;
    },
    increaseCart(state, { payload }: PayloadAction<number>) {
      const pizza = state.pull.find(pizza => pizza.id == payload);
      if (pizza) pizza.order++;
      localStorage.setItem(LS_PIZZA_PULL, pullToLocalStorage(state.pull));
    },
    decreaseCart(state, { payload }: PayloadAction<number>) {
      const pizza = state.pull.find(pizza => pizza.id == payload);
      if (pizza) pizza.order = Math.max(pizza.order - 1, 0);
      localStorage.setItem(LS_PIZZA_PULL, pullToLocalStorage(state.pull));
    }
  },
  extraReducers(builder) {
    builder.addCase(loadPizzas.fulfilled, (state, { payload }) => {
      payload.saved.forEach(order => {
        const pizza = payload.pull.find(p => p.id == order.id);
        if (pizza) pizza.order = order.order;
      });
      state.pull = payload.pull;
    });
    builder.addCase(submitOrder.fulfilled, state => {
      state.pull.forEach(p => (p.order = 0));
    });
  }
});

export const { setPull, increaseCart, decreaseCart } = slice.actions;
export default slice.reducer;
