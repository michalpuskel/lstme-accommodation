import React, { useState, useEffect } from "react";

import { auth } from "../../config/firebase";

const Bootstrapper = () => {
  const [redirect, setRedirect] = useState(null);

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  useEffect(() => {
    const foo = async () => {
      await sleep(3000);
      console.log("timer");
      auth.onAuthStateChanged(currentUser => {
        if (currentUser) {
          const { uid, email } = currentUser;
          setRedirect("user");
        } else {
          setRedirect("login");
        }
      });
    };
    foo();
  }, []);

  const renderRedirect = () => {
    return redirect === "user" ? "ok" : redirect === "login" ? "nope" : "";
  };

  return (
    <>
      <div>Loading</div>
      {renderRedirect()}
    </>
  );
};

export default Bootstrapper;
