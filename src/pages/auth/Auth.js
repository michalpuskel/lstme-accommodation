import React, { useContext } from "react";

import "./Auth.scss";
import useAuth from "../../hooks/auth/useAuth";

import Layout from "../../application/layout/layout/Layout";
import FormBasic from "../../lib/auth/formBasic/FormBasic";
import FormRegistration from "../../lib/auth/formRegistration/FormRegistration";
import ErrorMessage from "../../lib/ErrorMessage";
import BanContext from "../../config/BanContext";

// TODO refactor
const Auth = () => {
  const [error, setError] = React.useState();
  const [emailClass, setEmailClass] = React.useState("");

  const {
    authType,
    formBasic,
    formRegistration,
    navRegistrationHandler,
    navLoginHandler,
    submitLoginHandler,
    submitRegistrationHandler,
    loadingLogin
  } = useAuth(setError);

  const { ban, setBan } = useContext(BanContext);

  const banError = {
    message:
      "Váš účet bol zablokovaný. Pre viac informácií kontaktujte administrátora, prosím."
  };

  return (
    <>
      {ban && <ErrorMessage error={banError} setError={setBan} />}
      {error && <ErrorMessage error={error} setError={setError} />}
      <Layout title={authType === "login" ? "Prihlásenie" : "Registrácia"}>
        <div className="columns">
          <div className="column">
            <form
              onSubmit={
                authType === "login"
                  ? submitLoginHandler
                  : submitRegistrationHandler
              }
            >
              <FormBasic
                {...formBasic}
                authType={authType}
                emailClass={emailClass}
                setEmailClass={setEmailClass}
              />

              {authType === "login" ? (
                <div className="level auth__buttons">
                  <div className="level-left">
                    <div className="level-item">
                      <div className="field">
                        <div className="control">
                          <button
                            className={`button is-success ${
                              loadingLogin ? "is-loading" : ""
                            }`}
                            type="submit"
                          >
                            Prihlásiť
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="level-right">
                    <div className="level-item">
                      <div className="field">
                        <div className="control">
                          <button
                            className="button is-light"
                            type="button"
                            onClick={navRegistrationHandler}
                          >
                            Registrácia
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <FormRegistration
                  passwordInput={formBasic.passwordInput}
                  {...formRegistration}
                  navLoginHandler={navLoginHandler}
                  emailClass={emailClass}
                />
              )}
            </form>
          </div>
          <div className="column is-two-fifths is-hidden-mobile" />
        </div>
      </Layout>
    </>
  );
};

export default Auth;
