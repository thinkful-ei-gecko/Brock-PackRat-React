import React, { Component } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import TokenService from "../../services/token-service";

export default class LoginPage extends Component {
  static defaultProps = {
    location: {},
    history: {
      push: () => {}
    }
  };

  handleLoginSuccess = () => {
    const { location, history } = this.props;
    const destination = (location.state || {}).from || "/homepage";
    this.props.changeUser(TokenService.getAuthToken());
    history.push(destination);
  };

  render() {
    return (
      <div>
        <h2>Log In</h2>
        <LoginForm onLoginSuccess={this.handleLoginSuccess} />
      </div>
    );
  }
}
