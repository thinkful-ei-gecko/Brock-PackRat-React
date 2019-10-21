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
      <section className="HeaderContainer">
        <nav className="NavHeader">
            <h1>
              <Link to="/homepage">PackRat</Link>
            </h1>
            <span className="HeaderTaglineWide">Be the PackRat.</span>
        </nav>
        <div className="HeaderLoggedInContainer">
          <Link to="/homepage">
            <p>
              Home
            </p>
          </Link>
          <Link to="/login">
            <button className="HeaderLogoutButton" onClick={this.handleLogoutClick}>Logout
            </button>
          </Link>
        </div>
      </section>
    );
  }

  renderLoginLink() {
    return (
      <section className="HeaderContainer">
        <nav className="NavHeader">
            <h1>
              <Link to="/">PackRat</Link>
            </h1>
            <span className="HeaderTaglineWide">Be the PackRat.</span>
        </nav>
        <div className="HeaderNotLoggedIn">
          <Link to="/login">Log in</Link>
          <Link to="/register">Register</Link>
        </div>
      </section>
    );
  }

  render() {
    return (
      <>
        <div className="Header">
          {this.props.user ? this.renderLogoutLink() : this.renderLoginLink()}
        </div>
      </>
    );
  }
}

export default withRouter(Header);