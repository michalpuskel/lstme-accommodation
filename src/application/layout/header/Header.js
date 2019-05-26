import React, { useContext } from "react";

import "./Header.scss";
import UserContext from "../../../config/UserContext";
import Navigation from "../../../lib/nav/navigation/Navigation";
import Breadcrumb from "../../../lib/nav/breadcrumb/Breadcrumb";

const Header = props => {
  const user = useContext(UserContext);

  return (
    <header className="hero-head">
      <div className={`nav__border--bottom ${!user ? "auth" : ""}`} />
      <div className="container">
        <nav className="navbar" role="navigation" aria-label="main navigation">
          {user && <Navigation />}
        </nav>
        {props.breadcrumb && <Breadcrumb breadcrumb={props.breadcrumb} />}
        <h1 className="title header__title">{props.title}</h1>
      </div>
    </header>
  );
};

export default Header;
