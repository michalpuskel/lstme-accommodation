import React from "react";
import { BrowserRouter } from "react-router-dom";
import useAuthedUser from "../../hooks/user/useAuthedUser";
import ErrorMessage from "../../lib/ErrorMessage";
import Loading from "../../lib/loading/Loading";
import App from "../app/App";

const Bootstrapper = () => {
  const [ban, setBan] = React.useState(false);
  const authedUser = useAuthedUser(setBan);

  const banError = {
    message:
      "Váš účet bol zablokovaný. Pre viac informácií kontaktujte administrátora, prosím."
  };

  return (
    <BrowserRouter>
      {/* {console.log("AUTH", authedUser)} TODO feedabck */}
      {authedUser === undefined ? (
        <Loading />
      ) : (
        <>
          {ban && <ErrorMessage error={banError} setError={setBan} />}
          <App user={authedUser} ban={ban} />
        </>
      )}
    </BrowserRouter>
  );
};

export default Bootstrapper;
