import React, { memo } from "react";

const Loading = memo(() => (
  <div className="hero-body">
    <div className="container">
      <div className="level">
        <div className="level-item">
          <span className="button is-primary is-loading">Loading</span>
        </div>
      </div>
    </div>
  </div>
));

export default Loading;
