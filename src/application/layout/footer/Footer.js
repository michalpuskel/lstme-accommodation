import React, { useContext } from "react";

import logo from "../../../resources/img/logo.svg";
import useCampTitle from "../../../hooks/utils/useCampTitle";
import UserContext from "../../../config/UserContext";

const Footer = () => {
  const user = useContext(UserContext);
  const { event_id } = user || {};
  const campTitle = useCampTitle();

  return (
    <footer className="footer hero-foot">
      <div className="container">
        <div className="level content">
          <div className="level-left">
            <div className="level-item">&copy; {campTitle()}</div>
          </div>

          {event_id && (
            <div className="level-item">
              <a
                href="http://lstme.sk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={logo} alt="LSTME" width="96" height="96" />
              </a>
            </div>
          )}

          <div className="level-right">
            <div className="level-item">
              <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}>
                kontakt
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
