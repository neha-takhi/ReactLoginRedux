import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { history } from "../_helpers";
import { alertActions, userActions } from "../_actions";
import { Nav } from "../_components/Nav";
import { PrivateRoute } from "../_components/PrivateRoute";
import { HomePage } from "../HomePage";
import { LoginPage } from "../LoginPage";
import { PageNotFound } from "../PageNotFound";
import { DashBoard } from "../DashBoard";
import "../scss/app.scss";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth
    };
    history.listen((location, action) => {
      // clear alert on location change
      this.props.clearAlerts();
    });
    this._openMenu = this._openMenu.bind(this);
    this.responsiveMenu = React.createRef();
  }
  componentDidMount() {
    this.props.getUsers();
  }
  componentWillMount() {
    window.addEventListener("resize", this.handleWindowSizeChange);
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth });
  };

  // when the component is not mounted anymore
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleWindowSizeChange);
  }

  _openMenu() {
    const divClass = this.responsiveMenu.current.classList;
    if (!divClass.contains("responsive")) {
      this.responsiveMenu.current.classList.add("responsive");
    } else {
      this.responsiveMenu.current.classList.remove("responsive");
    }
  }
  render() {
    const { alert, user } = this.props;
    const { width } = this.state;
    return (
      <div className="jumbotron">
        <div className="container">
          <div className="col-sm-8 col-sm-offset-2">
            {/* adding conditon for Nav- view */}
            {alert.message && (
              <div className={`alert ${alert.type}`}>{alert.message}</div>
            )}

            <Router history={history}>
              <div>
                {user && (
                  <Nav
                    width={width}
                    responsiveMenu={this.responsiveMenu}
                    openMenu={this._openMenu}
                  />
                )}
                <Switch>
                  <PrivateRoute exact path="/" component={HomePage} />
                  <Route path="/dashboard" component={DashBoard} />
                  <Route path="/login" component={LoginPage} />
                  <Route component={PageNotFound} />
                </Switch>
              </div>
            </Router>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  const { alert, authentication } = state;
  const { user } = authentication;
  return { user, alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear,
  getUsers: userActions.getAll
};

const connectedApp = connect(
  mapState,
  actionCreators
)(App);
export { connectedApp as App };
