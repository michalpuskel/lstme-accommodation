import React, { Component } from "react";
import { Link } from "react-router-dom";

import { auth } from "../firebase";

//todo
const Input = ({ label, ...rest }) => (
  <label>
    {label}:
    <input {...rest} />
  </label>
);
//todo

class LoginScreen extends Component {
  state = {
    emailInput: "",
    passwordInput: ""
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(
        this.state.emailInput,
        this.state.passwordInput
      );
    } catch (err) {
      console.info("error", err);
    }
  };

  render() {
    const { emailInput, passwordInput } = this.state;

    //todo
    const inputProps = (key, props) => {
      return {
        type: "text",
        value: this.state[key],
        onChange: this.handleInputChange,
        name: key,
        ...props
      };
    };
    //todo

    return (
      <form onSubmit={this.handleSubmit}>
        {/* todo */}
        {["email", "name", "fooo"].map(key => (
          <Input label={key} {...inputProps(key)} />
        ))}
        <Input
          label="foobar"
          {...inputProps("email")}
          placeholder="foo@bar.com"
        />
        {/* todo */}
        <label>
          email:
          <input
            type="email"
            value={emailInput}
            onChange={this.handleInputChange}
            name="emailInput"
            placeholder="meno@email.sk"
            required
          />
        </label>
        <label>
          heslo:
          <input
            type="password"
            value={passwordInput}
            onChange={this.handleInputChange}
            name="passwordInput"
            placeholder="*****"
            required
          />
        </label>
        <input type="submit" value="Prihlásiť" />
        <Link
          to={{
            pathname: "/registration",
            state: { emailInput, passwordInput }
          }}
        >
          Registrácia
        </Link>
      </form>
    );
  }
}

export default LoginScreen;
