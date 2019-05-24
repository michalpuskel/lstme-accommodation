import React from "react";

import useCampTitle from "../../../hooks/user/useCampTitle";

const Footer = () => {
  const campTitle = useCampTitle();

  return (
    <footer className="footer hero-foot">
      <div className="content has-text-centered">
        <p>
          &copy; {campTitle()}
          <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}>kontakt</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
