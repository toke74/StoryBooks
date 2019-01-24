import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Truncate from "react-truncate";
import { getUserPublicStories } from "../../actions/storyActions";
import Icon from "@material-ui/core/Icon";

export class UserPublicStories extends Component {
  componentDidMount() {
    const id = this.props.match.params.uid;
    this.props.getUserPublicStories(id);
  }

  render() {
    const { story } = this.props.story.story;
    const { user, isAuthenticated } = this.props.auth;
    const newStory = Array.from(story);
    const editIcon = isAuthenticated ? (
      <div className="card-image right-align">
        <Link to={`/api/edit/${story._id}`}>
          <Icon className="" color="secondary">
            edit
          </Icon>
        </Link>
      </div>
    ) : null;

    console.log(this.props.auth);
    let publicUserStories;
    if (newStory) {
      publicUserStories = newStory.map(story => (
        <div key={story._id} className="col s12 m4">
          <div className="card">
            {editIcon}
            <div className="card-content center-align">
              <h5>{story.title}</h5>
              <p className="story-text">
                <Truncate
                  lines={3}
                  ellipsis={
                    <span>
                      ...{" "}
                      <Link to={`/api/fullstory/${story._id}`}>Read more</Link>
                    </span>
                  }
                >
                  {story.body}
                </Truncate>
              </p>
              <br />
              <div className="chip">
                <img src={user.image} alt="" />
                <Link to="/dashboard">
                  {user.firstName} {user.lastName}
                </Link>
              </div>
            </div>
            <div className="card-action center-align">
              <Link className="btn grey" to={`/api/fullstory/${story._id}`}>
                Read More
              </Link>
            </div>
          </div>
        </div>
      ));
    } else {
      publicUserStories = <p>No stories found</p>;
    }

    return (
      <div>
        <h3>Public Stories from {user.firstName}</h3>
        <div className="row">{publicUserStories}</div>
      </div>
    );
  }
}

UserPublicStories.propTypes = {
  getUserPublicStories: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  story: state.story,
  auth: state.auth
});

export default connect(
  mapStateToProps,

  { getUserPublicStories }
)(UserPublicStories);
