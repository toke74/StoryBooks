import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

export class Navbar extends Component {
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const capitalize = name => {
      if (typeof name !== "string") return "";
      return name.charAt(0).toUpperCase() + name.slice(1);
    };

    const authLinks = (
      <ul className="right hide-on-small-only">
        <li>
          <a href="/dashboard">Welcome {capitalize(user.firstName)}</a>
        </li>
        <li>
          <a href="/api/logout">
            <i className="fa fa-sign-out" /> Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="right hide-on-small-only">
        <li>
          <Link to="/public/stories">
            <i className="fa fa-book" /> Public Stories
          </Link>
        </li>
      </ul>
    );

    const authSideLinks = (
      <ul className="side-nav sidebar" id="main-menu">
        <li>
          <a href="/public/stories">
            <i className="fa fa-book" /> Public Stories
          </a>
        </li>
        <li className="divider" />
        <li>
          <a href="/dashboard">
            <i className="fa fa-cog" /> Dashboard
          </a>
        </li>

        <li>
          <Link to={`/my/stories/${user._id}`}>
            <i className="fa fa-user" /> My Stories
          </Link>
        </li>
        <li>
          <a href="/api/logout">
            <i className="fa fa-sign-out" /> Logout
          </a>
        </li>
      </ul>
    );
    const guestSideLinks = (
      <ul className="side-nav sidebar" id="main-menu">
        <li>
          <a href="/login">
            <i className="fa fa-sign-in" />
            Login
          </a>
        </li>
        <li>
          <a href="/register">
            <i className="fa fa-user-plus" />
            Register
          </a>
        </li>
        <li>
          <Link to="/public/stories">
            <i className="fa fa-book" /> Public Stories
          </Link>
        </li>
        <li>
          <a className="btn red darken-1" href="/auth/google">
            <i className="fa fa-google left" /> Login With Google
          </a>
        </li>
        <li>
          <a className="btn  github " href="/auth/google">
            <i className="fa fa-github left" /> Login With Github
          </a>
        </li>
      </ul>
    );

    return (
      <nav className="grey darken-3">
        <div className="container">
          <div className="nav-wrapper">
            <a href="/" className="brand-logo center">
              StoryBooks
            </a>
            <a
              href="/"
              data-activates="main-menu"
              className="button-collapse show-on-large"
            >
              <i className="fa fa-bars" />
            </a>

            {isAuthenticated ? authLinks : guestLinks}

            {isAuthenticated ? authSideLinks : guestSideLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  // errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
