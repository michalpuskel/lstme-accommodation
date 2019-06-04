import React from "react";

const NavBurger = props => {
  return (
    <div
      role="button"
      className={`navbar-burger burger ${props.showMenu ? "is-active" : ""}`}
      aria-label="menu"
      aria-expanded="false"
      data-target="navMenu"
      onClick={props.toggleMenu}
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </div>
  );
};

export default NavBurger;
