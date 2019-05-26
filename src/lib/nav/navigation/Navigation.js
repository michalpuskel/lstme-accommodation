import React from "react";

import "./Navigation.scss";
import NavLinks from "../navLinks/NavLinks";
import NavUser from "../navUser/NavUser";

const Navigation = () => {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a
          className="navbar-item"
          href="http://lstme.sk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h1 className="title">LSTME</h1>
        </a>

        <div
          role="button"
          className="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navMenu"
        >
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </div>
      </div>

      <div id="navMenu" className="navbar-menu">
        <NavLinks />
        <NavUser />
      </div>
    </nav>
  );
};

export default Navigation;
