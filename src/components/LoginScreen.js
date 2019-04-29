import React, { Component } from "react";
import { Link } from "react-router-dom";

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
  };

  render() {
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
        <Link to="/registration">Registrácia</Link>
      </form>
    );
  }
}

export default LoginScreen;
