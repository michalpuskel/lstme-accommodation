import React, { memo, ReactElement } from "react";

import "./Header.scss";
import { useUserContext } from "../../../hooks/_context/UserContext";

import Navigation from "../../../components/nav/Navigation";
import Breadcrumb from "../../../components/nav/Breadcrumb";

interface IHeaderProps {
  title: string;
  breadcrumb: any; // TODO
}

const Header = memo(
  (props: IHeaderProps): ReactElement => {
    const user = useUserContext();

    return (
      <header className="hero-head">
        <div className={`nav__border--bottom ${!user ? "auth" : ""}`} />
        <div className="container">
          <nav
            className="navbar"
            role="navigation"
            aria-label="main navigation"
          >
            {user && <Navigation />}
          </nav>

          {props.breadcrumb && <Breadcrumb breadcrumb={props.breadcrumb} />}

          <h1 className="title header__title">{props.title}</h1>
        </div>
      </header>
    );
  }
);

export default Header;
