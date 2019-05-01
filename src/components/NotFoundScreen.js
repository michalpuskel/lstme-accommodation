import React from "react";
import { Link } from "react-router-dom";

const NotFoundScreen = () => {
  return (
    <p>
      Asi ste zablúdili. <br />
      Vráťte sa na <Link to="/">hlavnú stránku</Link>.
    </p>
  );
};

export default NotFoundScreen;
