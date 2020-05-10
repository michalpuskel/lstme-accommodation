import React from "react";

import logo from "../../resources/img/logo.svg";

const EventRow = ({ title, description, image }) => (
  <div className="box">
    <div className="flex justify-between">
      <div className="pr-8">
        <h3 className="title">{title}</h3>
        {description && <p>{description}</p>}
      </div>
      <img src={logo} alt="LSTME" width="96" height="96" />
    </div>
  </div>
);

export default EventRow;
