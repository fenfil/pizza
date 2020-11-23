import React from "react";
import "./styles.css";
import { useSelector, useDispatch, shallowEqual } from "react-redux";
import { RootState } from "../../store";
import MiniCart from "../MiniCart";
import { currencyToDisplayName } from "../../utils/sanitizers";
import { toggleCurrency } from "../../slices/rates";
import { Link } from "react-router-dom";

interface Selector {
  name: string;
  isAuth: boolean;
  currency: string;
}

const Header = () => {
  const dispatch = useDispatch();
  const { name, isAuth, currency } = useSelector<RootState, Selector>(
    state => ({
      name: state.user.name,
      isAuth: state.user.isAuth,
      currency: currencyToDisplayName(state.rates.currency)
    }),
    shallowEqual
  );

  return (
    <header className="header">
      <Link to="/" className="header_title">
        Pizza
      </Link>
      <div className="header_menu">
        <div className="btn" onClick={() => dispatch(toggleCurrency())}>
          {currency}
        </div>
        {isAuth ? (
          <Link className="btn" to="/history">
            {name}
          </Link>
        ) : (
          <div>
            <Link to="/login" className="header_login">
              Login
            </Link>
            <Link to="/register" className="header_login">
              Register
            </Link>
          </div>
        )}
        <MiniCart />
      </div>
    </header>
  );
};

export default Header;
