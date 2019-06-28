import React, { memo, ReactElement } from "react";
import { Link } from "react-router-dom";

import NavBurger from "./NavBurger";

interface INavBrandProps {
  isActive?: boolean;
  onClick?: () => void;
}

const NavBrand = memo(
  (props: INavBrandProps): ReactElement => (
    <>
      <Link className="navbar-item" to="/">
        <h1 className="title">LSTME</h1>
      </Link>

      <NavBurger {...props} />
    </>
  )
);

export default NavBrand;
