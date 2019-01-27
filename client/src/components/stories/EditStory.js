import React, { Component } from "react";
import { Link } from "react-router-dom";
// import classnames from "classnames";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { editStory } from "../../actions/storyActions";
import { getSingleStory } from "../../actions/storyActions";

export class EditStory extends Component {
  state = {
    body: "",
    title: "",
    status: "public",
    allowComments: true,
    id: "",
    errors: {}
  };

  componentDidMount() {
    const id = this.props.match.params.id;
    this.setState({
      id: this.props.match.params.id
    });
    this.props.getSingleStory(id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.story) {
      const { story } = nextProps.story.story;
      console.log(story);

      // Set component fields state
      this.setState({
        body: story.body,
        title: story.title,
        status: story.status,
        allowComments: story.allowComments
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onCheck = e => {
    this.setState({
      allowComments: !this.state.allowComments
    });
  };
  onSubmit = e => {
    e.preventDefault();
    const id = this.state.id;
    const story = {
      body: this.state.body,
      title: this.state.title,
      status: this.state.status,
      allowComments: this.state.allowComments
    };
    this.props.editStory(id, story, this.props.history);
  };

  render() {
    // const { errors } = this.state;
    return (
      <div className="add">
        <Link to="/dashboard" className="btn grey backtodash">
          Go Back
        </Link>
        <div className="container">
          <h1>Edit Story</h1>
          <div className="row">
            <form onSubmit={this.onSubmit} className="col s12">
              <div className="row">
                <div className="input-field">
                  <input
                    type="text"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                </div>
              </div>

              <label htmlFor="status">Status </label>
              <select
                className="browser-default"
                name="status"
                value={this.state.status}
                onChange={this.onChange}
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="unpublished">Unpublished</option>
              </select>
              <br />
              <div className="row">
                <input
                  type="checkbox"
                  className="filled-in"
                  name="allowComments"
                  value={this.state.allowComments}
                  checked={this.state.allowComments}
                  onChange={this.onCheck}
                  id="allowComments"
                />
                <label htmlFor="allowComments" className="filled-in-box">
                  Allow Comments{" "}
                </label>
              </div>

              <div className="row">
                <div className="input-field">
                  <h5>Tell Us Your Story:</h5>
                  <textarea
                    name="body"
                    value={this.state.body}
                    onChange={this.onChange}
                  />
                </div>
              </div>
              <input type="submit" value="Update" className="btn" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}
EditStory.propTypes = {
  editStory: PropTypes.func.isRequired,
  getSingleStory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  story: state.story,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { editStory, getSingleStory }
)(EditStory);
