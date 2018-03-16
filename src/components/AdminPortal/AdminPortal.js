import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  getAllUsers,
  getUserAdmins,
  enableAdmin,
  disableAdmin,
  createAdmin,
  deleteAdmin
} from "../../ducks/reducer";
import swal from "sweetalert";

import axios from "axios";

class AdminPortal extends Component {
  constructor() {
    super();
    this.state = {
      num1: -1,
      num2: 1,
      initial: false,
      rawData: [],
      userAdminsArr: [],
      counter: 1,
      value: "",
      value2: ""
    };
    this.disableUser = this.disableUser.bind(this);
    this.enableUser = this.enableUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.createAdmin = this.createAdmin.bind(this);
    this.deleteAdmin = this.deleteAdmin.bind(this);
    this.refreshLists = this.refreshLists.bind(this);
    this.listToggle = this.listToggle.bind(this);
  }
  componentDidMount() {
    this.props.getUserAdmins();
    this.props.getAllUsers();
  }

  shouldComponentUpdate() {
    return true;
  }

  disableUser(name, isadmin) {
    if (this.props.user.name === name) {
      swal("You may not administrate your own account!");
    } else {
      swal({
        title: "Are you sure you want to disable this Admin?",
        text: "Once disabled, user will loose access to Admin functions",
        icon: "warning",
        buttons: true,
        dangerMode: true
      }).then(willDelete => {
        if (willDelete) {
          swal("Very Well...", {
            icon: "success"
          });
          this.props.disableAdmin(name);
          this.refreshLists();
          this.props.getUserAdmins();
        } else {
          swal("Action Successfully Canceled");
          return;
        }
      });
    }
  }
  enableUser(name, isadmin) {
    swal({
      title: "Are you sure you want to enable this Admin?",
      text: "Once enabled, user will have access to Admin functions",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        swal("Very Well...", {
          icon: "success"
        });
        this.props.enableAdmin(name);
        this.refreshLists();
        this.props.getUserAdmins();
      } else {
        swal("Action Successfully Canceled");
        return;
      }
    });
  }

  createAdmin(name, id) {
    swal({
      title: "Are you sure you want to add this Admin?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        swal("Very Well...", {
          icon: "success"
        });
        this.props.createAdmin(name, id);
        this.refreshLists();
        this.props.getUserAdmins();
      } else {
        swal("Action Successfully Canceled");
        return;
      }
    });
  }
  deleteAdmin(id) {
    swal({
      title: "Are you sure you want to delete this Admin?",
      text: "",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        swal("Very Well...", {
          icon: "success"
        });
        this.props.deleteAdmin(id);
        this.refreshLists();
        this.props.getUserAdmins();
      } else {
        swal("Action Successfully Canceled");
        return;
      }
    });
  }
  handleChange(event) {
    this.setState({ value: event.target.value });
  }
  handleChange2(event) {
    this.setState({ value2: event.target.value });
  }

  refreshLists() {
    this.props.getAllUsers();
    this.props.getUserAdmins();
    this.props.getAllUsers();
    this.props.getUserAdmins();
  }
  listToggle() {
    let x = this.state.initialNum;
    this.setState({ initial: false });
    this.refreshLists();
  }
  listToggle2() {
    let x = this.state.initialNum;
    this.setState({ initial: true });
    this.refreshLists();
  }

  render() {
    let results = this.props.userAdmins.map((data, i) => {
      let name = data.name;
      return (
        <tr key={`${data.name}${i}`}>
          <td>{data.name}</td>
          <td>{data.authid}</td>
          <td>
            {data.isadmin === 1 && (
              <button
                className="button-success pure-button"
                type="submit"
                onClick={() => {
                  this.disableUser(name, data.isadmin);
                }}
              >
                True
              </button>
            )}

            {data.isadmin === 0 && (
              <button
                className="button-warning pure-button"
                onClick={() => {
                  this.enableUser(name, data.isadmin);
                }}
              >
                False
              </button>
            )}
            <button
              className="button-error pure-button"
              onClick={() => {
                this.deleteAdmin(parseInt(data.id));
              }}
            >
              X
            </button>
          </td>
        </tr>
      );
    });
    let userResults = this.props.allUsers.slice(0, 10).map((data, i) => {
      let names = data.name;
      return (
        <tr key={`${data.names}${i}`}>
          <td>{data.id}</td>
          <td className="wordWrap">{data.name}</td>
          <td>{data.authid}</td>
          <td>
            <button
              className="button-warning pure-button"
              onClick={() => {
                this.createAdmin(data.name, data.id);
              }}
            >
              +
            </button>
          </td>
        </tr>
      );
    });
    let userResults2 = this.props.allUsers.slice(10).map((data, i) => {
      let names = data.name;
      return (
        <tr key={`${data.names}${i}`}>
          <td>{data.id}</td>
          <td className="wordWrap">{data.name}</td>
          <td>{data.authid}</td>
          <td>
            <button
              className="button-warning pure-button"
              onClick={() => {
                this.createAdmin(data.name, data.id);
              }}
            >
              +
            </button>
          </td>
        </tr>
      );
    });
    return (
      <div className="adminWrapper">
        {this.props.user.name !== undefined && (
          <div>
            <h3 id="adminHeader">User Admins</h3>
            <table className="pure-table pure-table-bordered center">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Auth ID</th>
                  <th>Admin</th>
                </tr>
              </thead>
              <tbody>{results}</tbody>
              <br />
            </table>
            <br />
            <h3> Users</h3>

            <table className="pure-table pure-table-bordered center">
              {this.state.initial === false && <thead>{userResults}</thead>}
            </table>

            <table className="pure-table pure-table-bordered center">
              {this.state.initial === true && <thead> {userResults2}</thead>}
            </table>

            <button
              className="pure-button pure-button-primary button-xlarge"
              onClick={() => this.listToggle()}
            >
              &#8249;
            </button>
            <button
              className="pure-button pure-button-primary button-xlarge"
              onClick={() => this.listToggle2()}
            >
              &#8250;
            </button>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(
  connect(mapStateToProps, {
    getAllUsers,
    getUserAdmins,
    enableAdmin,
    disableAdmin,
    createAdmin,
    deleteAdmin
  })(AdminPortal)
);
