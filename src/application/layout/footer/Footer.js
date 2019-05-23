import React from "react";

import useCampTitle from "../../../hooks/user/useCampTitle";

const Footer = () => {
  const campTitle = useCampTitle();

  return (
    <footer>
      &copy; {campTitle()}
      <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}>kontakt</a>
    </footer>
  );
};

export default Footer;
