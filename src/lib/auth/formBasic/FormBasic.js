import React from "react";

const FormBasic = props => {
  return (
    <>
      <label>
        email:
        <input
          type="email"
          value={props.emailInput}
          onChange={props.changeEmailInputHandler}
          placeholder="meno@email.sk"
          required
        />
      </label>

      <label>
        heslo:
        <input
          type="password"
          value={props.passwordInput}
          onChange={props.changePasswordInputHandler}
          placeholder="Heslo"
          required
        />
      </label>
    </>
  );
};

export default FormBasic;
