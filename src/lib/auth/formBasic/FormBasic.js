import React from "react";
import { strongPassword } from "../../../helpers";

// TODO refactor
const FormBasic = ({ authType, ...props }) => {
  const passwordValidation = (() => {
    if (authType === "login") return null;

    return strongPassword(props.passwordInput) ? true : false;
  })();

  const passwordValidationClassName = (() => {
    console.log({ authType });
    if (authType === "login") return "";
    console.log("ok");

    return strongPassword(props.passwordInput) ? "is-success" : "is-danger";
  })();

  return (
    <>
      <div className="field">
        <label className="label" htmlFor={props.id.email}>
          Email
        </label>
        <div className="control has-icons-left">
          <input
            className="input"
            id={props.id.email}
            type="email"
            value={props.emailInput}
            onChange={props.changeEmailInputHandler}
            placeholder="meno@email.sk"
            required
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label" htmlFor={props.id.password}>
          Heslo
        </label>
        <div className="control has-icons-left">
          <input
            className={`input ${passwordValidationClassName}`}
            id={props.id.password}
            type="password"
            value={props.passwordInput}
            onChange={props.changePasswordInputHandler}
            placeholder="Heslo"
            required
          />
          <span className="icon is-small is-left">
            <i className="fas fa-lock" />
          </span>
        </div>
        {passwordValidation === false && (
          <p className="help is-danger">Slabé heslo. Zadajte aspoň 6 znakov.</p>
        )}
      </div>
    </>
  );
};

export default FormBasic;
