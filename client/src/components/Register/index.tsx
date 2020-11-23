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
  validateEmail,
  validateAddress
} from "../../utils/validation";
import { register } from "../../slices/user";

const Register = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");

  const submit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (!validateUsername(name))
      return toastr.error(
        "Invalid username",
        "should contain only a-Z and _ and be at least 4 symbols length"
      );
    if (!validateEmail(email)) return toastr.error("Invalid email", "");
    if (!validatePassword(password))
      return toastr.error(
        "Invalid password",
        "should contain only a-Z0-9 and _ and be at least 4 symbols length"
      );
    if (!validateAddress(address))
      return toastr.error("Invalid address", "it is too short");
    dispatch(register({ name, email, password, address }));
  };

  return (
    <form className="register" onSubmit={submit}>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Username"
      />
      <input
        type="text"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="text"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input
        type="text"
        value={address}
        onChange={e => setAddress(e.target.value)}
        placeholder="Address"
      />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
