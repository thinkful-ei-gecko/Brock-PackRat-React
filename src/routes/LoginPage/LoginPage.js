import React, { Component } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/";
    history.push(destination);
	};
	
  render() {
    return (
      <div>
        <h2>Log In</h2>
        <LoginForm onLoginSuccess={this.handleLoginSuccess}/>
      </div>
    );
  }
}