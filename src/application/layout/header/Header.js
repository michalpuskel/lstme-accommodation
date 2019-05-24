import React, { useContext } from "react";

import UserContext from "../../../config/UserContext";
import Navigation from "../../../lib/nav/navigation/Navigation";

const Header = () => {
  const user = useContext(UserContext);

  return <header className="hero-head"> {user && <Navigation />} </header>;
};

export default Header;
