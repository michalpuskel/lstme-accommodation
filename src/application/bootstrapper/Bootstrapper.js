import React from "react";
import { BrowserRouter } from "react-router-dom";

import useAuthedUser from "../../hooks/user/useAuthedUser";
import App from "../app/App";

const Bootstrapper = () => {
  const authedUser = useAuthedUser();

  return (
    <BrowserRouter>
      {authedUser === undefined ? (
        <div>Loading...</div>
      ) : (
        <App user={authedUser} />
      )}
    </BrowserRouter>
  );
};

export default Bootstrapper;
