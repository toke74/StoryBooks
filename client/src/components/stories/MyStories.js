import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Truncate from "react-truncate";
import { getStory } from "../../actions/storyActions";
import Icon from "@material-ui/core/Icon";

export class MyStories extends Component {
  // componentDidMount() {
  //   console.log(this.props);
  //   const id = this.props.match.params.id;
  //   this.props.getMyStories(id);
  // }
  componentDidMount() {
    this.props.getStory();
  }

  render() {
    const { story } = this.props.story;
    const { user } = this.props.auth;

    let publicUserStories;
    if (story) {
      console.log(this.props.story.story.stories);
      let editIcon;

      const newStory = Array.from(this.props.story.story.stories);
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
              <div className="card-image">{editIcon}</div>
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
                  <img src={user.image} alt="" />
                  <Link to={`/api/fullstory/${story._id}`}>
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
        );
      });
    } else {
      publicUserStories = <p>No stories found</p>;
    }

    return (
      <div>
        <h1>My Stories</h1>
        <div className="row">{publicUserStories}</div>
      </div>
    );
  }
}

MyStories.propTypes = {
  getStory: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  story: state.story,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getStory }
)(MyStories);
