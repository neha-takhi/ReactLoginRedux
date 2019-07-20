import React, { Fragment } from "react";
import { connect } from "react-redux";
import { userActions } from "../_actions";

class HomePage extends React.Component {
  componentDidMount() {
    this.props.getUsers();
  }

  render() {
    const { user } = this.props;
    return (
      <Fragment>
        <h1>Hi {user.firstName}!</h1>
      </Fragment>
    );
  }
}

function mapState(state) {
  const { users, authentication } = state;
  const { user } = authentication;
  return { user, users };
}

const actionCreators = {
  getUsers: userActions.getAll
};

const connectedHomePage = connect(
  mapState,
  actionCreators
)(HomePage);
export { connectedHomePage as HomePage };
