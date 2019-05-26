import { useState, useCallback } from "react";

const useFormBasic = () => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");

  const changeEmailInputHandler = useCallback(
    event => {
      setEmailInput(event.target.value);
    },
    [setEmailInput]
  );

  const changePasswordInputHandler = useCallback(
    event => {
      setPasswordInput(event.target.value);
    },
    [setPasswordInput]
  );

  const email = "emailInput";
  const password = "passwordInput";

  return {
    emailInput,
    passwordInput,
    changeEmailInputHandler,
    changePasswordInputHandler,
    id: { email, password }
  };
};

export default useFormBasic;
