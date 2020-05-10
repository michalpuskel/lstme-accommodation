import React, { useContext } from "react";

import UserContext from "../../../config/UserContext";
import useNav from "../../../hooks/utils/useNav";

import NavLinks from "../navLinks/NavLinks";
import NavUser from "../navUser/NavUser";
import NavBrand from "../navBrand/NavBrand";
import useEvent from "../../../pages/EventList/useEvent";

const Navigation = () => {
  const user = useContext(UserContext);
  const { event_id } = user || {};
  const { showMenu, toggleMenu } = useNav();

  const event = useEvent(event_id);

  return (
    <>
      <div className="navbar-brand">
        <NavBrand showMenu={showMenu} toggleMenu={toggleMenu} />
      </div>
      <div
        id="navMenu"
        className={`navbar-menu ${showMenu ? "is-active" : ""}`}
      >
        {event_id && event && <NavLinks />}
        <NavUser />
      </div>
    </>
  );
};

export default Navigation;
