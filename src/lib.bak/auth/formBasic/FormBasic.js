import React, { useCallback, ChangeEvent } from "react";

// TODO refactor
const FormBasic = props => {
  // const inputHandler = useCallback(event => {
  //   const { name, value } = event.target;
  //   field.onChange(name, value);
  // });

  // const checkboxHandler = useCallback(event => {
  //   const name = event.target.name;
  //   const value = event.target.checked;
  //   field.onChange(name, value);
  // });

  // const inputHandler = useCallback(
  //   (event: ChangeEvent<HTMLInputElement>): void =>
  //     dispatch({ field: event.target.name, value: event.target.value }),
  //   []
  // );

  // id: `${field}Input`

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
            className="input"
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
      </div>
    </>
  );
};

export default FormBasic;
