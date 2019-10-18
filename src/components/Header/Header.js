import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import "./Header.css";
import TokenService from "../../services/token-service";

class Header extends Component {
  handleLogoutClick = ev => {
    ev.preventDefault();
    this.props.changeUser(null);
    TokenService.clearAuthToken();
    this.props.history.push('/login');
  };

  renderLogoutLink() {
    return (
      <div className="Header__logged-in">
        <Link to="/login">
          <button className="Header__logged-in" onClick={this.handleLogoutClick}>Logout
          </button>
        </Link>
      </div>
    );
  }

  renderLoginLink() {
    return (
      <div className="Header__not-logged-in">
        <Link to="/login">Log in</Link>
        <Link to="/register">Register</Link>
      </div>
    );
  }

  render() {
    return (
      <>
        <nav className="Header">
          <h1>
            <Link to="/">PackRat</Link>
          </h1>
          <span className="Header__tagline--wide">Be the PackRat.</span>
          {this.props.user ? this.renderLogoutLink() : this.renderLoginLink()}
        </nav>
      </>
    );
  }
}

export default withRouter(Header);