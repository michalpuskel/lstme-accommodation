import React, { Component } from "react";
import { Link } from "react-router-dom";

import { auth, database } from "../firebase";

class LoginScreen extends Component {
  state = {
    emailInput: "",
    passwordInput: "",
    user: null
  };

  handleInputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();

    let user = null;
    try {
      const userAuthData = await auth.signInWithEmailAndPassword(
        this.state.emailInput,
        this.state.passwordInput
      );
      const { uid, email } = userAuthData.user;
      user = { uid, email };
    } catch (err) {
      console.info("error", err);
    }

    try {
      const userDocRef = database.collection("users").doc(user.uid);
      const userDoc = await userDocRef.get();
      if (userDoc.exists) {
        const userDocData = userDoc.data();
        user = { ...user, ...userDocData };
      } else {
        console.info(`error: No document for user: ${user}`);
      }
    } catch (err) {
      console.info("error", err);
    }

    this.setState({ user });
    console.log(this.state.user);
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
