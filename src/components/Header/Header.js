import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Header.css'
import TokenService from '../../services/token-service';

export default class Header extends Component {
  handleLogoutClick = (ev) => {
    ev.preventDefault()
    TokenService.clearAuthToken();
  }


  renderLogoutLink() {
    return (
      <div className='Header__logged-in'>
        <Link
          onClick={this.handleLogoutClick}
          to='/'>
          Logout
        </Link>
      </div>
    )
  }

  renderLoginLink() {
    return (
      <div className='Header__not-logged-in'>
        <Link
          to='/login'>
          Log in
        </Link>
        <Link
          to='/register'>
          Register
        </Link>
      </div>
    )
  }

  render() {
    return <>
      <nav className='Header'>
        <h1>
          <Link to='/'>
            PackRat
          </Link>
        </h1>
        <span className='Header__tagline--wide'>Be the PackRat.</span>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </nav>
    </>
  }
}
