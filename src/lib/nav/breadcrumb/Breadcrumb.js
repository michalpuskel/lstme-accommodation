import React from "react";

import "./Breadcrumb.scss";
import BreadcrumbItem from "../breadcrumbItem/BreadcrumbItem";

const Breadcrumb = props => {
  return (
    <nav className="breadcrumb" aria-label="breadcrumbs">
      <ul>
        {props.breadcrumb.map((item, index) => (
          <BreadcrumbItem key={index} {...item} />
        ))}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
