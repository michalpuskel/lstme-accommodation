import React from "react";

const FormRegistration = props => {
  const handlePasswordConfirmInputChange = event => {
    props.setPasswordConfirmInput(event.target.value);
  };
  const handleFirstNameInputChange = event => {
    props.setFirstNameInput(event.target.value);
  };
  const handleLastNameInputChange = event => {
    props.setLastNameInput(event.target.value);
  };
  const handleBirthDateInputChange = event => {
    props.setBirthDateInput(event.target.value);
  };

  const checkPasswordConfirmed = () => {
    return props.passwordInput !== props.passwordConfirmInput;
  };

  return (
    <>
      <label>
        potvrdenie hesla:
        <input
          type="password"
          value={props.passwordConfirmInput}
          onChange={handlePasswordConfirmInputChange}
          placeholder="*****"
          required
          style={{
            backgroundColor: checkPasswordConfirmed()
              ? "lightcoral"
              : "lightgreen"
          }}
        />
      </label>
      <label>
        meno:
        <input
          type="text"
          value={props.firstNameInput}
          onChange={handleFirstNameInputChange}
          placeholder="Meno"
          required
        />
      </label>
      <label>
        priezvisko:
        <input
          type="text"
          value={props.lastNameInput}
          onChange={handleLastNameInputChange}
          placeholder="Priezvisko"
          required
        />
      </label>
      <label>
        dátum narodenia:
        <input
          type="date"
          value={props.birthDateInput}
          onChange={handleBirthDateInputChange}
          required
        />
      </label>
      <input
        type="submit"
        value="Registrovať"
        disabled={checkPasswordConfirmed()}
      />
    </>
  );
};

export default FormRegistration;
