import React, { useContext } from "react";
import { Link } from "react-router-dom";

import NavBurger from "../navBurger/NavBurger";
import UserContext from "../../../config/UserContext";

const NavBrand = (props) => {
  const user = useContext(UserContext);
  const { event_id } = user || {};

  return (
    <>
      {event_id && (
        <Link className="navbar-item" to="/">
          <h1 className="title">LSTME</h1>
        </Link>
      )}
      <NavBurger showMenu={props.showMenu} toggleMenu={props.toggleMenu} />
    </>
  );
};

export default NavBrand;
