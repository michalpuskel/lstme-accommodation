import React from "react";
import { strongPassword, isFreeEmail, validateEmail } from "../../../helpers";

// TODO refactor
const FormBasic = ({ authType, emailClass, setEmailClass, ...props }) => {
  const [loadingEmail, setLoadingEmail] = React.useState(false);

  React.useEffect(() => {
    if (authType === "login") {
      setEmailClass("");
    }
  }, [authType, setEmailClass]);

  const passwordValidation = (() => {
    if (authType === "login") return;

    return strongPassword(props.passwordInput) ? true : false;
  })();

  const passwordValidationClassName = (() => {
    if (authType === "login") return "";

    return strongPassword(props.passwordInput) ? "is-success" : "is-danger";
  })();

  const checkEmail = () => {
    if (authType === "login") return;

    const valid = validateEmail(props.emailInput);
    if (!valid) {
      setEmailClass("is-danger");
      return;
    }

    setLoadingEmail(true);

    isFreeEmail(props.emailInput)
      .then(free => {
        setEmailClass(free ? "is-success" : "is-danger");
        setLoadingEmail(false);
      })
      .catch(e => {
        console.error(e);
        setLoadingEmail(false);
      });
  };

  return (
    <>
      <div className="field">
        <label className="label" htmlFor={props.id.email}>
          Email
        </label>
        <div
          className={`control has-icons-left ${
            authType === "registration" && loadingEmail ? "is-loading" : ""
          }`}
        >
          <input
            className={`input ${emailClass}`}
            id={props.id.email}
            type="email"
            value={props.emailInput}
            onChange={props.changeEmailInputHandler}
            placeholder="meno@email.sk"
            required
            onBlur={checkEmail}
          />
          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>
        </div>
        {emailClass === "is-danger" && (
          <p className="help is-danger">
            {validateEmail(props.emailInput)
              ? "Tento email je už obsadený"
              : "Email má nesprávny formát"}
          </p>
        )}
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
