import React, { useState, SyntheticEvent } from "react";
import "./styles.css";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RootState } from "../../store";
import MiniCart from "../MiniCart";
import { Currency } from "../../constants/currency";
import { currencyToDisplayName } from "../../utils/sanitizers";
import { toggleCurrency } from "../../slices/rates";
import { Link } from "react-router-dom";
import { toastr } from "react-redux-toastr";
import {
  validateUsername,
  validatePassword,
  validateEmail
} from "../../utils/validation";
import { login } from "../../slices/user";

const Login = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!validateUsername(name))
      return toastr.error(
        "Invalid username",
        "should contain only a-Z and _ and be at least 4 symbols length"
      );
    if (!validatePassword(password))
      return toastr.error(
        "Invalid password",
        "should contain only a-Z0-9 and _ and be at least 4 symbols length"
      );
    dispatch(login({ name, password }));
  };

  return (
    <form className="login" onSubmit={submit}>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Username"
        className="login_input"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        className="login_input"
      />
      <button type="submit" className="btn">
        Login
      </button>
    </form>
  );
};

export default Login;
