import React, { ReactElement } from "react";

import { EAuthType } from "../../@types/auth";
import useAuth from "../../hooks/auth/useAuth";
import { mainTitle, hasErrors } from "../../helpers/auth";

import Layout from "../../application/Layout";
import FormLogin from "../../components/auth/FormLogin";
import FormRegistration from "../../components/auth/FormRegistration";
import AuthButtons from "../../components/auth/AuthButtons";

const Auth = (): ReactElement => {
  const { authType, setAuthType, formAuth, handler } = useAuth();

  return (
    <Layout title={mainTitle(authType)}>
      <div className="columns">
        <div className="column">
          <form onSubmit={handler.onSubmit}>
            <FormLogin />

            {authType === EAuthType.REGISTRATION && <FormRegistration />}

            <AuthButtons
              authType={authType}
              setAuthType={setAuthType}
              hasErrors={hasErrors(formAuth)}
            />
          </form>
        </div>
        <div className="column is-two-fifths is-hidden-mobile" />
      </div>
    </Layout>
  );
};

export default Auth;
