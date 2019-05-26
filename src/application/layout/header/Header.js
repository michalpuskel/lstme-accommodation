import React, { useContext } from "react";

import "./Header.scss";
import UserContext from "../../../config/UserContext";
import Navigation from "../../../lib/nav/navigation/Navigation";

const Header = props => {
  const user = useContext(UserContext);

  return (
    <header className="hero-head">
      {user && <Navigation />}
      <div className="container">
        <h1 className="title header__title">{props.title}</h1>
      </div>
    </header>
  );
};

export default Header;
