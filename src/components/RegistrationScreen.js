import React, { Component } from "react";

import { auth } from "../firebase";
import { createUserWithId } from "../backend";

class RegistrationScreen extends Component {
  state = {
    emailInput: "",
    passwordInput: "",
    passwordConfirmInput: "",
    firstNameInput: "",
    lastNameInput: "",
    birthDateInput: ""
  };

  componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        emailInput: this.props.location.state.emailInput,
        passwordInput: this.props.location.state.passwordInput
      });
    }
  }

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    let newUser = null;
    try {
      const createdUserAuthData = await auth.createUserWithEmailAndPassword(
        this.state.emailInput,
        this.state.passwordInput
      );
      const { uid, email } = createdUserAuthData.user;
      newUser = { uid, email };
    } catch (err) {
      console.info("error", err);
    }

    try {
      await createUserWithId({
        uid: newUser.uid,
        first_name: this.state.firstNameInput,
        last_name: this.state.lastNameInput,
        birth_date: this.state.birthDateInput
      });
    } catch (err) {
      console.info("error", err);
    }
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
