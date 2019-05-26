import React from "react";

const NavBrand = props => {
  return (
    <>
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
    </>
  );
};

export default NavBrand;
