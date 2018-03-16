import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import "whatwg-fetch";
import swal from "sweetalert";

import { getUser, getUserAdmins } from "../../ducks/reducer";

let adminCheck = false;
class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipient: ""
    };
  }

  componentDidMount() {
    this.props.getUser();
    this.props.getUserAdmins();
  }
  changeInput = event => {
    this.setState({ recipient: event.target.value });
  };

  sendSms = () => {
    let results = this.props.userAdmins.map((data, i) => {
      if (this.props.user.name === data.name) {
        adminCheck = true;
      }
    });
    if (adminCheck === true) {
      fetch("/api/send", {
        method: "POST",
        headers: {
          Accept: "application/JSON",
          "Content-Type": "application/JSON"
        },
        body: JSON.stringify({ recipient: this.state.recipient })
      }).then(resp => {});
      swal("Message Sent Successfully!");
    } else {
      swal("This function is restricted to administrators");
    }
  };

  render() {
    return (
      <div>
        {this.props.user.id && (
          <div className="reportWrapper">
            <h3>
              NOTICE: The SMS feature is only available to Administrators.
              Please contact Logan Simonsen to request an Administrator account.{" "}
            </h3>
            <p>Enter phone number to send SMS to: </p>
            <input
              onChange={this.changeInput}
              value={this.state.recipient}
              placeholder="+12223334444"
            />
            <br />
            <button
              className="pure-button button-secondary"
              onClick={this.sendSms}
            >
              Send SMS
            </button>
            <p>
              OUTGOING MESSAGE TEXT: "Please join the following conference
              bridge line ASAP regarding a priority 1 incident:
              10001234567,,9876543"
            </p>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, { getUser, getUserAdmins })(Report)
);
