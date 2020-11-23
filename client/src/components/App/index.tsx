import React, { useEffect } from "react";
import Layout from "../Layout";
import "./styles.css";
import { Switch, Route } from "react-router-dom";
import PizzaPull from "../PizzaPull";
import History from "../History";
import Cart from "../Cart";
import { useDispatch } from "react-redux";
import { loadPizzas } from "../../slices/pizza";
import { loadRates } from "../../slices/rates";
import Login from "../Login";
import Register from "../Register";
import { fetchUser } from "../../slices/user";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPizzas());
    dispatch(loadRates());
    dispatch(fetchUser());
  }, []);

  return (
    <Layout>
      <Switch>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/history">
          <History />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/">
          <PizzaPull />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
