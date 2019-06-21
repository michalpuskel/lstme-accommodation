import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

import Layout from "../../application/Layout";

const NotFound = (): ReactElement => (
  <Layout title="Neexistujúca stránka">
    <p>
      Asi ste zablúdili. <br />
      Vráťte sa na <Link to="/">hlavnú stránku</Link>.
    </p>
  </Layout>
);

export default NotFound;
