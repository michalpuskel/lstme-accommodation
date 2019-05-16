import React, { useState } from "react";

import { auth, database } from "../../config/firebase";
import useFormBasic from "../../hooks/form/useFormBasic";
import useFormRegistration from "../../hooks/form/useFormRegistration";
import Layout from "../../application/layout/layout/Layout";
import FormBasic from "../../lib/auth/formBasic/FormBasic";
import FormRegistration from "../../lib/auth/formRegistration/FormRegistration";

const Auth = () => {
  const [authType, setAuthType] = useState("login");
  const formBasic = useFormBasic();
  const formRegistration = useFormRegistration();

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

    //TODO transaction begin

    let newUser = null;
    try {
      const createdUserAuthData = await auth.createUserWithEmailAndPassword(
        formBasic.emailInput,
        formBasic.passwordInput
      );
      const { uid, email } = createdUserAuthData.user;
      newUser = { uid, email };
    } catch (err) {
      console.info("error", err);
    }

    const newUserDocRef = database.collection("users").doc(newUser.uid);
    try {
      await newUserDocRef.set({
        uid: newUser.uid,
        email: newUser.email,
        first_name: formRegistration.firstNameInput,
        last_name: formRegistration.lastNameInput,
        birth_date: formRegistration.birthDateInput,
        is_supervisor: false,
        is_super_admin: false,
        room_id: null,
        swap_sent_to_id: null,
        swap_received_from_id: null
      });
    } catch (err) {
      console.info("error", err);
    }

    //TODO transaction end
  };

  return (
    <Layout title={authType === "login" ? "Prihlásenie" : "Registrácia"}>
      <form
        onSubmit={
          authType === "login" ? handleLoginSubmit : handleRegistrationSubmit
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
