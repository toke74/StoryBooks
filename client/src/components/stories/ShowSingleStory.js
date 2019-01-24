import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Spinner from "../../common/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSingleStory } from "../../actions/storyActions";

export class ShowSingleStory extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getSingleStory(id);
  }
  render() {
    const { story } = this.props.story.story;
    const { user } = this.props.auth;
    // console.log(this.props.match);
    // console.log(user);
    // console.log(story);

    let SigleStoryContent;

    if (story && user) {
      SigleStoryContent = (
        <div className="row">
          <div className="col s12 m8">
            <h3>{story.title}</h3>
            <div className="card story">
              <div className="card-content">
                <span className="card-title">
                  <Moment format="MMMM do YYYY">{story.date}</Moment>
                </span>
                {story.body}
              </div>
            </div>
          </div>

          <div className="col s12 m4">
            <div className="card center-align">
              <div className="card-content">
                <span className="card-title">
                  {story.user.firstName} {story.user.lastName}
                </span>
                <img
                  src={story.user.image}
                  alt="your avatar"
                  className="circle responsive-img"
                />
              </div>
              <div className="card-action">
                <Link to={`/public/stories/${story.user._id}`}>
                  More From {story.user.firstName}
                </Link>
                {/* <a href="/stories/user/story.user.id">
                  More From {story.user.firstName}
                </a> */}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      SigleStoryContent = <Spinner />;
    }

    return <div>{SigleStoryContent}</div>;
  }
}

ShowSingleStory.propTypes = {
  getSingleStory: PropTypes.func.isRequired,
  story: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  story: state.story,
  auth: state.auth
});

export default connect(
  mapStateToProps,

  { getSingleStory }
)(ShowSingleStory);
