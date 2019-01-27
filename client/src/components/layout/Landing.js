import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

export class Landing extends Component {
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  render() {
    return (
      <div className="landing">
        <h1>Welcome</h1>
        <div className="row">
          <div className="col s12 m12">
            <p>Welcome to StoryBooks 1.0.0</p>
            <p>
              Post stories from the best and worst of your life and choose for
              them to be read by the world or completley private as your own
              personal diary
            </p>
            <a className="btn red darken-1 " href="/auth/google">
              <i className="fa fa-google left" /> Login With Google
            </a>
            <br />
            <a className="btn  github " href="/auth/github">
              <i className="fa fa-github left" /> Login With Github
            </a>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
