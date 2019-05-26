import { useState, useCallback } from "react";

const useFormRegistration = () => {
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [birthDateInput, setBirthDateInput] = useState("");

  const changePasswordConfirmInputHandler = useCallback(
    event => {
      setPasswordConfirmInput(event.target.value);
    },
    [setPasswordConfirmInput]
  );

  const changeFirstNameInputHandler = useCallback(
    event => {
      setFirstNameInput(event.target.value);
    },
    [setFirstNameInput]
  );

  const changeLastNameInputHandler = useCallback(
    event => {
      setLastNameInput(event.target.value);
    },
    [setLastNameInput]
  );

  const changeBirthDateInputHandler = useCallback(
    event => {
      setBirthDateInput(event.target.value);
    },
    [setBirthDateInput]
  );

  const passwordConfirm = "passwordConfirmInput";
  const firstName = "firstNameInput";
  const lastName = "lastNameInput";
  const birthDate = "birthDateInput";

  return {
    passwordConfirmInput,
    firstNameInput,
    lastNameInput,
    birthDateInput,
    changePasswordConfirmInputHandler,
    changeFirstNameInputHandler,
    changeLastNameInputHandler,
    changeBirthDateInputHandler,
    id: { passwordConfirm, firstName, lastName, birthDate }
  };
};

export default useFormRegistration;
