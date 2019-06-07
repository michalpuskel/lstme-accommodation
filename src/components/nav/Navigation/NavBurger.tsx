import React, { memo } from "react";

interface NavBurgerProps {
  showMenu: boolean;
  toggleMenu: () => void;
}

const NavBurger = memo((props: NavBurgerProps) => (
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
));

export default NavBurger;
