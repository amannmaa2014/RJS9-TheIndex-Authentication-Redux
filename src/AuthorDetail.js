import React, { Component } from "react";

// Components
import BookTable from "./BookTable";
import Loading from "./Loading";
import AddBookModal from "./AddBookModal";

import { connect } from "react-redux";

import * as actionCreators from "./store/actions/index";

class AuthorDetail extends Component {
  componentDidMount() {
    this.props.getAuthor(this.props.match.params.authorID);
  }

  render() {
    if (this.props.loading) {
      return <Loading />;
    } else {
      const author = this.props.author;
      return (
        <div className="author">
          <div>
            <h3>{author.first_name + " " + author.last_name}</h3>
            <img
              src={author.imageUrl}
              className="img-thumbnail img-fluid"
              alt={author.first_name + " " + author.last_name}
            />
          </div>
          <BookTable books={author.books} />
          {this.props.user ? <AddBookModal authorID={author.id} /> : <div />}
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.rootAuth.user,
    author: state.rootAuthor.author,
    loading: state.rootAuthor.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getAuthor: authorID => dispatch(actionCreators.fetchAuthorDetail(authorID))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthorDetail);
