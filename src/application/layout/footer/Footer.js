import React from "react";

import useCampTitle from "../../../hooks/user/useCampTitle";

const Footer = () => {
  const campTitle = useCampTitle();

  return (
    <footer className="footer hero-foot">
      <div className="level content">
        <div className="level-left">
          <div className="level-item">&copy; {campTitle()}</div>
        </div>
        <div className="level-right">
          <div className="level-item">
            <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}>
              kontakt
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
