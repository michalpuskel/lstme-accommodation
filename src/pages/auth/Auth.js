import React, { useState } from "react";

import { auth } from "../../config/firebase";
import useFormBasic from "../../hooks/form/useFormBasic";
import Layout from "../../application/layout/layout/Layout";
import FormBasic from "../../lib/auth/formBasic/FormBasic";

const Auth = () => {
  const [authType, setAuthType] = useState("login");
  const formBasic = useFormBasic();

  const handleRegistrationNav = () => {
    setAuthType("registration");
  };
  const handleLoginNav = () => {
    setAuthType("login");
  };

  const handleLoginSubmit = async event => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(
        formBasic.emailInput,
        formBasic.passwordInput
      );
    } catch (err) {
      console.info("error", err);
    }
  };

  const handleRegistrationSubmit = async event => {
    event.preventDefault();
  };

  return (
    <Layout title={authType === "login" ? "Prihlásenie" : "Registrácia"}>
      <form
        onSubmit={
          authType === "login" ? handleLoginSubmit : handleRegistrationSubmit
        }
      >
        <FormBasic {...formBasic} />

        <input
          type="submit"
          value={authType === "login" ? "Prihlásiť" : "Registrovať"}
        />
        <button
          type="button"
          onClick={
            authType === "login" ? handleRegistrationNav : handleLoginNav
          }
        >
          {authType === "login" ? "Registrácia" : "Prihlásenie"}
        </button>
      </form>
    </Layout>
  );
};

export default Auth;
