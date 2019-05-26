import React from "react";

import useCheckPasswordConfirmed from "../../../hooks/auth/useCheckPasswordConfirmed";

//TODO refactor
const FormRegistration = props => {
  const checkPasswordConfirmed = useCheckPasswordConfirmed();
  const { passwordInput, passwordConfirmInput } = props;

  const check = checkPasswordConfirmed({
    passwordInput,
    passwordConfirmInput
  });

  return (
    <>
      <div className="field">
        <label className="label" htmlFor={props.id.passwordConfirm}>
          Potvrdenie hesla
        </label>
        <div className="control has-icons-left has-icons-right">
          <input
            className={`input ${check ? "is-danger" : "is-success"}`}
            id={props.id.passwordConfirm}
            type="password"
            value={props.passwordConfirmInput}
            onChange={props.changePasswordConfirmInputHandler}
            placeholder="Potvrdenie hesla"
            required
          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock" />
          </span>
          {/* TODO wtf icon is not updating ??? */}
          {/* <span className="icon is-small is-right">
            <i
              className={`fas ${
                check ? "fa-exclamation-triangle" : "fa-check"
              }`}
            />
          </span> */}
        </div>
        {check && (
          <p className="help is-danger">Zadané emaily nie sú rovnaké</p>
        )}
      </div>

      <div className="field">
        <label className="label" htmlFor={props.id.firstName}>
          Meno
        </label>
        <div className="control has-icons-left">
          <input
            className="input"
            id={props.id.firstName}
            type="text"
            value={props.firstNameInput}
            onChange={props.changeFirstNameInputHandler}
            placeholder="Meno"
            required
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor={props.id.lastName}>
          Priezvisko
        </label>
        <div className="control has-icons-left">
          <input
            className="input"
            id={props.id.lastName}
            type="text"
            value={props.lastNameInput}
            onChange={props.changeLastNameInputHandler}
            placeholder="Priezvisko"
            required
          />
          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor={props.id.birthDate}>
          Dátum narodenia
        </label>
        <div className="control has-icons-left">
          <input
            className="input"
            id={props.id.birthDate}
            type="date"
            value={props.birthDateInput}
            onChange={props.changeBirthDateInputHandler}
            required
          />
          <span className="icon is-small is-left">
            <i className="fas fa-calendar" />
          </span>
        </div>
      </div>

      <div className="level auth__buttons">
        <div className="level-left">
          <div className="level-item">
            <div className="field">
              <div className="control">
                <input
                  className="button is-success"
                  type="submit"
                  value="Registrovať"
                  disabled={check}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="level-right">
          <div className="level-item">
            <div className="field">
              <div className="control">
                <button
                  className="button is-light"
                  type="button"
                  onClick={props.navLoginHandler}
                >
                  Prihlásenie
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormRegistration;
