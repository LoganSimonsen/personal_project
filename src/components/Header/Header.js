import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getUser } from "../../ducks/reducer";
import { getUserAdmins } from "../../ducks/reducer";
import { logout } from "../../ducks/reducer";

let temp = "";
let imgTemp = "";
let x = "";
class Header extends Component {
  constructor() {
    super();
    this.state = {
      gitID: ""
    };
    this.handleClick = this.handleClick.bind(this);
    this.openNav = this.openNav.bind(this);
    this.closeNav = this.closeNav.bind(this);
    this.pageRefresh = this.pageRefresh.bind(this);
  }
  componentDidMount() {
    this.props.getUser().then(response => {
      temp = response.value.authid;
    });
  }

  handleClick(event) {
    event.preventDefault();
    this.closeNav();
    this.props.logout();
    this.props.getUser();
    this.pageRefresh();
  }
  pageRefresh() {
    this.props.logout();
    this.props.getUser();
  }
  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }
  render() {
    temp = temp.replace(/github|/gi, "");
    temp = temp.replace(/\|/g, "");
    let imgTemp =
      "https://avatars1.githubusercontent.com/u/" + temp + "?s=460&v=4";
    return (
      <header className="App-header">
        <div>
          <br />
          <div className="loginButtonWrapper">
            <a href={process.env.REACT_APP_LOGIN}>
              {this.props.user.id === undefined && (
                <span className="button-small pure-button loginButton">
                  <h1>Welcome to DashyBoards!</h1>
                  <br />
                  <h4>Click to Login</h4>
                  <img
                    src="http://www.favicon.cc/logo3d/914733.png"
                    alt="./logo.png"
                  />
                </span>
              )}
            </a>
          </div>
          {this.props.user.authid && (
            <img
              className="profileImage"
              src={imgTemp}
              alt="http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
            />
          )}
          {this.props.user ? (
            <div>
              {this.props.user.id > 0 && (
                <span id="welcome">Welcome {this.props.user.name}</span>
              )}
            </div>
          ) : (
            <h1>{this.props.errMessage}</h1>
          )}
        </div>
        <div id="mySidenav" class="sidenav">
          <a href="javascript:void(0)" class="closebtn" onClick={this.closeNav}>
            &times;
          </a>
          <Link to="/">Home</Link>
          <Link to="/Chart">Monitor</Link>
          <Link to="/Report">Report</Link>
          <Link to="/AdminPortal">Admin</Link>
          <a href={process.env.REACT_APP_LOGOUT} onClick={this.handleClick}>
            Logout
          </a>
        </div>
        {this.props.user.id > 0 && (
          <button className="imgButton" onClick={this.openNav}>
            <img id="headerLogo" src={require("./logo.png")} /> &dArr;
          </button>
        )}
      </header>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { getUser, getUserAdmins, logout })(Header)
);
