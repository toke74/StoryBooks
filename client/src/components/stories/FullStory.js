import React, { Component } from "react";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Spinner from "../../common/Spinner";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSingleStory } from "../../actions/storyActions";

export class FullStory extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.getSingleStory(id);
  }
  render() {
    const { story } = this.props.story.story;
    const { user } = this.props.auth;
    console.log(this.props.story.story);
    let SigleStoryContent;

    if (story && user) {
      SigleStoryContent = (
        <div className="row">
          <div className="col s12 m10">
            <h3>{story.title}</h3>
            <div className="card story">
              <div className="card-content">
                <span className="card-title">
                  <Moment format="MMMM do YYYY">{story.date}</Moment>
                </span>
                {story.body}
              </div>
              <div className="card-action right-align">
                <Link to={`/public/stories/${user._id}`}>
                  More From {user.firstName}
                </Link>
              </div>
            </div>
          </div>

          {/* <div className="col s12 m4">
            <div className="card center-align">
              <div className="card-content">
                <span className="card-title">
                  {user.firstName} {user.lastName}
                </span>
                <img
                  src={story.user.image}
                  alt="your avatar"
                  className="circle responsive-img"
                />
              </div>
              <div className="card-action">
                <Link to={`/public/stories/${user._id}`}>
                  More From {user.firstName}
                </Link>
              </div>
            </div>
          </div> */}
        </div>
      );
    } else {
      SigleStoryContent = <Spinner />;
    }

    return <div>{SigleStoryContent}</div>;
  }
}

FullStory.propTypes = {
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
)(FullStory);
