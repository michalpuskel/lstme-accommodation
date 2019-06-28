import React, { ReactNode, ReactElement } from "react";

import Header from "./Header";
import Content from "./Content";
import Footer from "./Footer";

interface ILayoutProps {
  title: string;
  breadcrumb?: any; // TODO
  children: ReactNode;
}

const Layout = (props: ILayoutProps): ReactElement => (
  <>
    <Header title={props.title} breadcrumb={props.breadcrumb} />
    <Content> {props.children} </Content>
    <Footer />
  </>
);

export default Layout;
