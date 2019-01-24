import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentUser } from "./actions/authActions";

import "./App.css";

import Dashboard from "./components/stories/Dashboard";
import Navbar from "./components/layout/Navbar";
import AddStory from "./components/stories/AddStory";
import ShowSingleStory from "./components/stories/ShowSingleStory";
import MyStories from "./components/stories/MyStories";
import FullStory from "./components/stories/FullStory";
import UserPublicStories from "./components/stories/UserPublicStories";
import PublicStories from "./components/stories/PublicStories";
import EditStory from "./components/stories/EditStory";
import Landing from "./components/layout/Landing";
import Footer from "./components/layout/Footer";

import PrivateRoute from "./common/PrivateRoute";

class App extends Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const addStoryButton = isAuthenticated ? (
      <div className="fixed-action-btn">
        <Link to="/add" className="btn-floating btn-large red">
          <i className="fa fa-plus" />
        </Link>
      </div>
    ) : null;
    return (
      <React.Fragment>
        <Router>
          <div className="app">
            <Navbar />
            {addStoryButton}
            <main>
              <div className="container">
                <Route exact path="/" component={Landing} />
                <Route exact path="/public/stories" component={PublicStories} />
                {/* <Route exact path="/edit" component={EditStory} /> */}
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
                <Switch>
                  <PrivateRoute exact path="/add" component={AddStory} />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/api/edit/:id"
                    component={EditStory}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/api/show/:id"
                    component={ShowSingleStory}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/api/fullstory/:id"
                    component={FullStory}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/public/stories/:uid"
                    component={UserPublicStories}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/my/stories/:id"
                    component={MyStories}
                  />
                </Switch>
              </div>
            </main>
            <Footer />
          </div>
        </Router>
      </React.Fragment>
    );
  }
}

App.propTypes = {
  getCurrentUser: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth
});
export default connect(
  mapStateToProps,
  { getCurrentUser }
)(App);
