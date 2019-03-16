import React, { Component } from "react";
import { connect } from "react-redux";

// Components
import AddAuthorCard from "./AddAuthorCard";
import AuthorCard from "./AuthorCard";
import SearchBar from "./SearchBar";
import Loading from "./Loading";

class AuthorsList extends Component {
  render() {
    const { loading, filteredAuthors } = this.props;

    const authorCards = filteredAuthors.map(author => (
      <AuthorCard key={author.first_name + author.last_name} author={author} />
    ));

    if (loading) {
      return <Loading />;
    } else {
      return (
        <div className="authors">
          <h3>Authors</h3>
          <SearchBar />
          <div className="row">
            {this.props.user ? <AddAuthorCard /> : <div />}
            {authorCards}
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    user: state.rootAuth.user,
    loading: state.rootAuthors.loading,
    filteredAuthors: state.rootAuthors.filteredAuthors
  };
};

export default connect(mapStateToProps)(AuthorsList);
