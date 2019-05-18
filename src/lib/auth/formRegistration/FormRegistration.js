import React from "react";

import useCheckPasswordConfirmed from "../../../hooks/auth/useCheckPasswordConfirmed";

const FormRegistration = props => {
  const checkPasswordConfirmed = useCheckPasswordConfirmed();
  const { passwordInput, passwordConfirmInput } = props;

  return (
    <>
      <label>
        potvrdenie hesla:
        <input
          type="password"
          value={props.passwordConfirmInput}
          onChange={props.changePasswordConfirmInputHandler}
          placeholder="*****"
          required
          style={{
            backgroundColor: checkPasswordConfirmed({
              passwordInput,
              passwordConfirmInput
            })
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
          onChange={props.changeFirstNameInputHandler}
          placeholder="Meno"
          required
        />
      </label>
      <label>
        priezvisko:
        <input
          type="text"
          value={props.lastNameInput}
          onChange={props.changeLastNameInputHandler}
          placeholder="Priezvisko"
          required
        />
      </label>
      <label>
        dátum narodenia:
        <input
          type="date"
          value={props.birthDateInput}
          onChange={props.changeBirthDateInputHandler}
          required
        />
      </label>
      <input
        type="submit"
        value="Registrovať"
        disabled={checkPasswordConfirmed({
          passwordInput,
          passwordConfirmInput
        })}
      />
    </>
  );
};

export default FormRegistration;
