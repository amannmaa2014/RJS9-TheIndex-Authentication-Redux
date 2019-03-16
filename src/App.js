import React, { Component } from "react";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// Actions
import * as actionCreators from "./store/actions";

// Components
import Sidebar from "./Sidebar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import Signup from "./SignupForm";
import Login from "./LoginForm";

class App extends Component {
  componentDidMount() {
    this.props.checkForExpiredToken();
    this.props.fetchAllAuthors();
  }

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar />
          </div>
          <div className="content col-10">
            <Switch>
              <Route path="/authors/:authorID" component={AuthorDetail} />
              <Route path="/authors" component={AuthorsList} />
              <Route path="/signup" component={Signup} />
              <Route path="/login" component={Login} />
              <Redirect to="/authors" />
            </Switch>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkForExpiredToken: () => dispatch(actionCreators.checkForExpiredToken()),
    fetchAllAuthors: () => dispatch(actionCreators.fetchAuthors())
  };
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
