import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LandingPage.css";


export default class LandingPage extends Component {
  

  render() {
    return (
        <div className="LandingPageContainer">
            <img src={process.env.PUBLIC_URL + '/favicon.png'} alt="logo"/>
            <h1>
              Welcome to PackRat!
            </h1>< br/>
            <p>
              <Link className="LandingPageLink" to="/login">Login</Link> or <Link className="LandingPageLink" to="/register">Register</Link> to Start collecting now!
            </p>
        </div>
      
    );
  }
}
