import React from "react";
import Header from "../Header";
import "./styles.css";
import ReduxToastr from "react-redux-toastr";

const Layout: React.FC = ({ children }) => (
  <div className="layout">
    <ReduxToastr
      timeOut={4000}
      newestOnTop={false}
      preventDuplicates
      position="top-left"
      transitionIn="fadeIn"
      transitionOut="fadeOut"
      progressBar
      closeOnToastrClick
    />
    <Header />
    <div className="main">{children}</div>
  </div>
);

export default Layout;
