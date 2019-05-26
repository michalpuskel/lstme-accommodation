import React from "react";

import Header from "../header/Header";
import Content from "../content/Content";
import Footer from "../footer/Footer";

const Layout = props => {
  return (
    <>
      <Header title={props.title} />
      <Content>{props.children}</Content>
      <Footer />
    </>
  );
};

export default Layout;
