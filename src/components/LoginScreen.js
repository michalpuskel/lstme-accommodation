import React, { Component } from "react";
import { Link } from "react-router-dom";

import { auth } from "../firebase";

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

    return (
      <form onSubmit={this.handleSubmit}>
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
