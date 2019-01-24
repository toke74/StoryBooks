import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Truncate from "react-truncate";
import { getMyStories } from "../../actions/storyActions";

export class MyStories extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getMyStories(id);
  }

  render() {
    const { story } = this.props.story.story;
    const { user } = this.props.auth;
    console.log(this.props.match.params);

    // console.log(newStory);
    let publicUserStories;
    if (story) {
      const newStory = Array.from(story);
      publicUserStories = newStory.map(story => (
        <div key={story._id} className="col s12 m4">
          <div className="card">
            <div className="card-image">
              {/* if user editIcon user.id ../user.id id if */}
            </div>
            <div className="card-content center-align">
              <h5>{story.title}</h5>
              <p className="story-text">
                {/* <Truncate text={story.body} /> */}
                {/* {story.body} */}
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
      ));
    } else {
      publicUserStories = <p>No stories found</p>;
    }

    return (
      <div>
        <h1>Stories</h1>
        <div className="row">{publicUserStories}</div>
      </div>
    );
  }
}

MyStories.propTypes = {
  getMyStories: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  story: state.story,
  auth: state.auth
});

export default connect(
  mapStateToProps,

  { getMyStories }
)(MyStories);
