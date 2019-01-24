import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Truncate from "react-truncate";
import { getPublicStories } from "../../actions/storyActions";
import Icon from "@material-ui/core/Icon";

export class PublicStories extends Component {
  componentDidMount() {
    this.props.getPublicStories();
  }

  render() {
    const { story, loading } = this.props.story;
    const { user } = this.props.auth;
    let publicUserStories;

    if (story === null || loading) {
      publicUserStories = <p>No stories found</p>;
    } else {
      const stories = this.props.story.story.stories;
      const newStory = Array.from(stories);

      if (newStory) {
        //story.user.id user.id story.id
        let editIcon;

        publicUserStories = newStory.map(story => {
          if (user._id === story.user._id) {
            editIcon = (
              <div className="card-image right-align">
                <Link to={`/api/edit/${story._id}`}>
                  <Icon className="" color="secondary">
                    edit
                  </Icon>
                </Link>
              </div>
            );
          } else {
            editIcon = null;
          }

          return (
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
                          <Link to={`/api/fullstory/${story._id}`}>
                            Read more
                          </Link>
                        </span>
                      }
                    >
                      {story.body}
                    </Truncate>
                  </p>
                  <br />
                  <div className="chip">
                    <img src={story.user.image} alt="" />
                    <Link to="/dashboard">
                      {story.user.firstName} {story.user.lastName}
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
          );
        });
      } else {
        publicUserStories = <p>No stories found</p>;
      }
    }

    return (
      <div>
        <h3>Public Stories </h3>
        <div className="row">{publicUserStories}</div>
      </div>
    );
  }
}

PublicStories.propTypes = {
  getPublicStories: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  story: state.story,
  auth: state.auth
});

export default connect(
  mapStateToProps,

  { getPublicStories }
)(PublicStories);
