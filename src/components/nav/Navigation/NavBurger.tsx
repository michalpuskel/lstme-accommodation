import React, { memo, ReactElement, HTMLAttributes } from "react";
// import cx from 'classnames';

interface INavBurgerProps {
  isActive?: boolean;
}

const NavBurger = memo(
  ({
    isActive,
    ...rest
  }: INavBurgerProps & HTMLAttributes<HTMLDivElement>): ReactElement => (
    <div
      role="button"
      className={`navbar-burger burger ${isActive ? "is-active" : ""}`}
      // className={cx('navbar-burger burger', {
      //   'is-active': isActive
      // })}
      aria-label="menu"
      aria-expanded="false"
      data-target="navMenu"
      {...rest}
      // onClick={props.toggleMenu}
    >
      <span aria-hidden="true" />
      <span aria-hidden="true" />
      <span aria-hidden="true" />
    </div>
  )
);

export default NavBurger;
