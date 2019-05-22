import React from "react";

import useUserDelete from "../../hooks/user/useUserDelete";
import Layout from "../../application/layout/layout/Layout";

const UserDetail = props => {
  const userDelete = useUserDelete(props.match.params.userId);

  return (
    <Layout title="Nastavenia používateľa">
      <button onClick={userDelete}>Vymazať konto</button>
    </Layout>
  );
};

export default UserDetail;
