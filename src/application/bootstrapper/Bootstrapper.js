import React from "react";
import { BrowserRouter } from "react-router-dom";
import useAuthedUser from "../../hooks/user/useAuthedUser";
import Loading from "../../lib/loading/Loading";
import App from "../app/App";
import BanContext from "../../config/BanContext";

const Bootstrapper = () => {
  const [ban, setBan] = React.useState(false);
  const authedUser = useAuthedUser(setBan);

  console.log({ authedUser });

  console.log({ ban });

  return (
    <BrowserRouter>
      {/* {console.log("AUTH", authedUser)} TODO feedabck */}
      {authedUser === undefined ? (
        <Loading />
      ) : (
        <BanContext.Provider value={{ ban, setBan }}>
          <App user={authedUser} key={authedUser && authedUser.uid} />
        </BanContext.Provider>
      )}
    </BrowserRouter>
  );
};

export default Bootstrapper;
