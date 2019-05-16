import React from "react";

const FormBasic = props => {
  const handleEmailInputChange = event => {
    props.setEmailInput(event.target.value);
  };
  const handlePasswordInputChange = event => {
    props.setPasswordInput(event.target.value);
  };

  return (
    <>
      <label>
        email:
        <input
          type="email"
          value={props.emailInput}
          onChange={handleEmailInputChange}
          placeholder="meno@email.sk"
          required
        />
      </label>
      <label>
        heslo:
        <input
          type="password"
          value={props.passwordInput}
          onChange={handlePasswordInputChange}
          placeholder="*****"
          required
        />
      </label>
    </>
  );
};

export default FormBasic;
