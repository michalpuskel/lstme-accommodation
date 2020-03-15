import { useState, useCallback } from "react";
import moment from "moment";

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
      const now = moment().format("YYYY-MM-DD");
      const newValue = event.target.value;

      setBirthDateInput(newValue < now ? newValue : now);
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
    setBirthDateInput,
    id: { passwordConfirm, firstName, lastName, birthDate }
  };
};

export default useFormRegistration;
