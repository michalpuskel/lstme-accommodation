import React from "react";

const Footer = () => {
  return (
    <footer>
      &copy; 2019 LSTME
      <a href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}>kontakt</a>
    </footer>
  );
};

export default Footer;
