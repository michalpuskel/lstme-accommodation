import React, { ReactElement } from "react";

const Loading = (): ReactElement => (
  <div className="hero-body">
    <div className="container">
      <div className="level">
        <div className="level-item">
          <span className="button is-primary is-loading">Loading</span>
        </div>
      </div>
    </div>
  </div>
);

export default Loading;
