import React from "react";

import "./Auth.scss";
import useAuth from "../../hooks/auth/useAuth";

import Layout from "../../application/layout/layout/Layout";
import FormBasic from "../../lib/auth/formBasic/FormBasic";
import FormRegistration from "../../lib/auth/formRegistration/FormRegistration";
import ErrorMessage from "../../lib/ErrorMessage";

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
    submitRegistrationHandler
  } = useAuth(setError);

  return (
    <>
      {error && ErrorMessage(error, setError)}
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
                          <input
                            className="button is-success"
                            type="submit"
                            value="Prihlásiť"
                          />
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
