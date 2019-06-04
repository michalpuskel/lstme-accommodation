import React from "react";
import { Link } from "react-router-dom";

const BreadcrumbItem = props => {
  return (
    <li className={props.active ? "is-active" : ""}>
      <Link to={props.path} aria-current={props.active ? "page" : ""}>
        {props.label}
      </Link>
    </li>
  );
};

export default BreadcrumbItem;
