import { useState } from "react";

const useFormRegistration = () => {
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
  const [firstNameInput, setFirstNameInput] = useState("");
  const [lastNameInput, setLastNameInput] = useState("");
  const [birthDateInput, setBirthDateInput] = useState("");

  return {
    passwordConfirmInput,
    setPasswordConfirmInput,
    firstNameInput,
    setFirstNameInput,
    lastNameInput,
    setLastNameInput,
    birthDateInput,
    setBirthDateInput
  };
};

export default useFormRegistration;
