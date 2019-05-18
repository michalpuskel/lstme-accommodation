import React from "react";

import useAuth from "../../hooks/auth/useAuth";
import Layout from "../../application/layout/layout/Layout";
import FormBasic from "../../lib/auth/formBasic/FormBasic";
import FormRegistration from "../../lib/auth/formRegistration/FormRegistration";

const Auth = () => {
  const {
    authType,
    formBasic,
    formRegistration,
    navRegistrationHandler,
    navLoginHandler,
    submitLoginHandler,
    submitRegistrationHandler
  } = useAuth();

  return (
    <Layout title={authType === "login" ? "Prihlásenie" : "Registrácia"}>
      <form
        onSubmit={
          authType === "login" ? submitLoginHandler : submitRegistrationHandler
        }
      >
        <FormBasic {...formBasic} />
        {authType === "login" ? (
          <input type="submit" value="Prihlásiť" />
        ) : (
          <FormRegistration
            passwordInput={formBasic.passwordInput}
            {...formRegistration}
          />
        )}

        <button
          type="button"
          onClick={
            authType === "login" ? navRegistrationHandler : navLoginHandler
          }
        >
          {authType === "login" ? "Registrácia" : "Prihlásenie"}
        </button>
      </form>
    </Layout>
  );
};

export default Auth;
