import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../../common/Spinner";
import Stories from "./Stories";

import { getStory, setStoryLoading } from "../../actions/storyActions";

export class Dashboard extends Component {
  componentDidMount() {
    this.props.getStory();
  }

  render() {
    const { user } = this.props.auth;
    const { story, loading } = this.props.story;

    let dashboardContent;

    if (story === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if logged in user has Story data
      if (Object.keys(story).length > 0) {
        dashboardContent = <Stories stories={story} />;
      } else {
        dashboardContent = <p>You have not created any stories yet</p>;
      }
    }

    return (
      <div>
        <h1>Welcome {user.firstName}</h1>
        <h4>Your Stories</h4>
        {dashboardContent}
      </div>
    );
  }
}
Dashboard.propTypes = {
  getStory: PropTypes.func.isRequired,
  setStoryLoading: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  story: state.story,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getStory, setStoryLoading }
)(Dashboard);
