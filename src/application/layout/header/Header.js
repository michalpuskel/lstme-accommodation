import React, { useContext } from "react";

import "./Header.scss";
import UserContext from "../../../config/UserContext";
import Navigation from "../../../lib/nav/navigation/Navigation";

const Header = props => {
  const user = useContext(UserContext);

  return (
    <header className="hero-head">
      <div className="nav__border--bottom" />
      <div className="container">
        {user && <Navigation />}
        <h1 className="title header__title">{props.title}</h1>
      </div>
    </header>
  );
};

export default Header;
