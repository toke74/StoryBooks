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
  componentWillReceiveProps(nextProps) {
    // console.log(nextProps);
  }
  render() {
    const { story } = this.props.story.story;
    const { user } = this.props.auth;
    // console.log(story);
    let SigleStoryContent;
    let showComment;
    let checkUser;

    if (story && user) {
      if (story.allowComments) {
        checkUser = user ? (
          <form method="post" action="/stories/comment/{{story.id}}">
            <div className="input-field">
              <textarea name="commentBody" className="materialize-textarea" />
              <label> Add Comment</label>
            </div>
            <input type="submit" value="Submit" className="btn" />
          </form>
        ) : (
          <p>
            Please <a href="/auth/google">log</a> in to leave a comment
          </p>
        );
        showComment = (
          <div className="card">
            <div className="card-content">
              <span className="card-title">Comments</span>
              {checkUser}
            </div>
          </div>
        );
      } else {
        showComment = null;
      }
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
            {showComment}
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
