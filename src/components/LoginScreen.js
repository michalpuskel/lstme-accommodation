import React, { Component } from "react";
import { Link } from "react-router-dom";

import { auth } from "../firebase";
import UserContext from "../UserContext";

class LoginScreen extends Component {
  state = {
    emailInput: "",
    passwordInput: ""
  };

  componentDidMount() {
    console.log("mount", this.context);
  }

  componentDidUpdate() {
    console.log("update", this.context);
  }

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
            value={this.state.emailInput}
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
            value={this.state.passwordInput}
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

        <Link to="/"> domov[tmp]</Link>
      </form>
    );
  }
}

LoginScreen.contextType = UserContext;

export default LoginScreen;
