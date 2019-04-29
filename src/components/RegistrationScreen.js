import React, { Component } from "react";

class RegistrationScreen extends Component {
  state = {
    emailInput: this.props.location.state.emailInput,
    passwordInput: this.props.location.state.passwordInput,
    passwordConfirmInput: "",
    firstNameInput: "",
    lastNameInput: "",
    birthDateInput: ""
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
  };

  checkPasswordConfirmed = () => {
    return this.state.passwordInput !== this.state.passwordConfirmInput;
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
        <label>
          potvrdenie hesla:
          <input
            type="password"
            value={this.state.passwordConfirmInput}
            onChange={this.handleInputChange}
            name="passwordConfirmInput"
            placeholder="*****"
            required
            style={{
              backgroundColor: this.checkPasswordConfirmed()
                ? "lightcoral"
                : "lightgreen"
            }}
          />
        </label>
        <label>
          meno:
          <input
            type="text"
            value={this.state.firstNameInput}
            onChange={this.handleInputChange}
            name="firstNameInput"
            placeholder="Meno"
            required
          />
        </label>
        <label>
          priezvisko:
          <input
            type="text"
            value={this.state.lastNameInput}
            onChange={this.handleInputChange}
            name="lastNameInput"
            placeholder="Priezvisko"
            required
          />
        </label>
        <label>
          dátum narodenia:
          <input
            type="datetime-local"
            value={this.state.birthDateInput}
            onChange={this.handleInputChange}
            name="birthDateInput"
            required
          />
        </label>
        <input
          type="submit"
          value="Registrovať"
          disabled={this.checkPasswordConfirmed()}
        />
      </form>
    );
  }
}

export default RegistrationScreen;
