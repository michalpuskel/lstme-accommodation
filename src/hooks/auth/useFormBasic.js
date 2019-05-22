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

  return {
    emailInput,
    passwordInput,
    changeEmailInputHandler,
    changePasswordInputHandler
  };
};

export default useFormBasic;
