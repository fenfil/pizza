import React from "react";
import Header from "../Header";
import "./styles.css";
import ReduxToastr from "react-redux-toastr";
import Container from "../Container";

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
    <Container>{children}</Container>
  </div>
);

export default Layout;
