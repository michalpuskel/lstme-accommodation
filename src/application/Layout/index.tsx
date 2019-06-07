import React, { ReactNode } from "react";

import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
  title: string;
  breadcrumb?: any; // TODO
}

const Layout = (props: LayoutProps) => (
  <>
    <Header title={props.title} breadcrumb={props.breadcrumb} />
    <Content> {props.children} </Content>
    <Footer />
  </>
);

export default Layout;
