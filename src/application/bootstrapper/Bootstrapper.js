import React from "react";
import { BrowserRouter } from "react-router-dom";

import useAuthedUser from "../../hooks/user/useAuthedUser";
import App from "../app/App";
import Loading from "../../lib/loading/Loading";

const Bootstrapper = () => {
  const authedUser = useAuthedUser();

  return (
    <BrowserRouter>
      {/* {console.log("AUTH", authedUser)} TODO feedabck */}
      {authedUser === undefined ? <Loading /> : <App user={authedUser} />}
    </BrowserRouter>
  );
};

export default Bootstrapper;
