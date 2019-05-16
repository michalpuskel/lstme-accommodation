import { useState } from "react";

const useFormBasic = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  return { emailInput, setEmailInput, passwordInput, setPasswordInput };
};

export default useFormBasic;
