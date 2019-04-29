import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { auth, database } from "../firebase";

class RegistrationScreen extends Component {
  state = {
    emailInput: this.props.location.state.emailInput,
    passwordInput: this.props.location.state.passwordInput,
    passwordConfirmInput: "",
    firstNameInput: "",
    lastNameInput: "",
    birthDateInput: "",

    redirectHomeScreen: false
  };

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
      await database
        .collection("users")
        .doc(newUser.uid)
        .set({
          first_name: this.state.firstNameInput,
          last_name: this.state.lastNameInput,
          birth_date: this.state.birthDateInput,
          is_supervisor: false,
          is_super_admin: false,
          room_id: null,
          swap_user_id: null
        });
    } catch (err) {
      console.info("error", err);
    }

    this.setState({ redirectHomeScreen: true });
  };

  checkPasswordConfirmed = () => {
    return this.state.passwordInput !== this.state.passwordConfirmInput;
  };

  render() {
    return (
      <>
        {this.state.redirectHomeScreen && <Redirect to="/" />}
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
      </>
    );
  }
}

export default RegistrationScreen;
