import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteStory } from "../../actions/storyActions";

export class Stories extends Component {
  onDeleteClick(id) {
    this.props.deleteStory(id, this.props.history);
  }

  render() {
    // console.log(this.props.stories.stories);
    const { stories } = this.props.stories;
    let Stories = "";
    if (stories) {
      Stories = stories.map(story => (
        <tr key={story._id}>
          <td>
            {" "}
            <Link to={`/api/show/${story._id}`}>{story.title}</Link>
          </td>
          <td>
            {" "}
            <Moment format="MMMM do YYYY">{story.date}</Moment>
          </td>
          <td>
            <span className="dash-status">{story.status}</span>
          </td>
          <td>
            {" "}
            <Link className="btn left-align edit" to={`/api/edit/${story._id}`}>
              <i className="fa fa-pencil" /> Edit
            </Link>
            <button
              type="submit"
              className="btn red"
              onClick={this.onDeleteClick.bind(this, story._id)}
            >
              <i className="fa fa-remove" /> Delete
            </button>
          </td>
        </tr>
      ));
    } else {
      Stories = null;
    }
    return (
      <div>
        <table className="striped">
          <thead>
            <tr>
              <th>Title</th>
              <th>Date</th>
              <th>Status</th>
              <th />
            </tr>
          </thead>
          <tbody>{Stories}</tbody>
        </table>
      </div>
    );
  }
}

Stories.propTypes = {
  deleteStory: PropTypes.func.isRequired
};

export default connect(
  null,
  { deleteStory }
)(withRouter(Stories));
