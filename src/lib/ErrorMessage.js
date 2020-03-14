import React from "react";

import "./ErrorMessage.scss";
import { translateError } from "../helpers";

const ErrorMessage = ({ error: { message, code }, setError }) => (
  <div className="error-message" onClick={() => setError(null)}>
    <article className="message is-danger">
      <div className="message-body">
        {code ? translateError(code) : message}
      </div>
    </article>
  </div>
);

export default ErrorMessage;
