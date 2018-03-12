import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getAllUsers, getUserAdmins, enableAdmin, disableAdmin, createAdmin, deleteAdmin } from "../../ducks/reducer";
import swal from 'sweetalert';

import axios from 'axios';

class AdminPortal extends Component {
    constructor(){
        super();
        this.state = {
            rawData: [],
            userAdminsArr: [],
            counter: 1,
            value: '',
            value2: ''
        }
        this.disableUser = this.disableUser.bind(this);
        this.enableUser = this.enableUser.bind(this);
        this.formSubmit = this.formSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleChange2 = this.handleChange2.bind(this);
        this.createAdmin = this.createAdmin.bind(this);
        this.deleteAdmin = this.deleteAdmin.bind(this);
    }
    componentDidMount(){
        this.props.getUserAdmins();
        this.props.getAllUsers();
    }


    shouldComponentUpdate() {
        return true;
    }
    


    disableUser(name, isadmin){
        if(this.props.user.name === name){
            swal('You may not administrate your own account!')
        }else{
        swal({
            title: "Are you sure you want to disable this Admin?",
            text: "Once disabled, user will loose access to Admin functions",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Very Well...", {
                icon: "success",
              });
              this.props.disableAdmin(name);
              this.props.getUserAdmins();
            } else {
              swal("Action Successfully Canceled");
              return;
            }
          });
}
    }
enableUser(name, isadmin){
    swal({
        title: "Are you sure you want to enable this Admin?",
        text: "Once enabled, user will have access to Admin functions",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Very Well...", {
            icon: "success",
          });
          this.props.enableAdmin(name);
          this.props.getUserAdmins();
        } else {
          swal("Action Successfully Canceled");
          return;
        }
      });
}

createAdmin(name, id){
    swal({
        title: "Are you sure you want to add this Admin?",
        text: '',
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Very Well...", {
            icon: "success",
          });
          this.props.createAdmin(name, id);
          this.props.getUserAdmins();
        } else {
          swal("Action Successfully Canceled");
          return;
        }
        
      });
}
deleteAdmin(id){
    swal({
        title: "Are you sure you want to delete this Admin?",
        text: '',
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Very Well...", {
            icon: "success",
          });
          this.props.deleteAdmin(id);
    this.props.getUserAdmins();
        } else {
          swal("Action Successfully Canceled");
          return;
        }
    });
}
handleChange(event) {
    this.setState({value: event.target.value});
  }
  handleChange2(event) {
    this.setState({value2: event.target.value});
  }

  

formSubmit(event){
    swal({
        title: "Are you sure you want to add this Admin?",
        text: "Once added, user will have access to Admin functions",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willSubmit) => {
        if (willSubmit) {
          swal("Very Well...", {
            icon: "success",
            // this.props.Admin(name, authid);
          });
        } else {
          swal("Action Successfully Canceled");
          return;
        }
        
      });
    event.preventDefault();
}

      render(){
          const {formSubmit} = this.state;
           let results = this.props.userAdmins.map((data, i) => {
               let name = data.name;
            return <tr key={`${data.name}${i}`}>
            <td>{data.name}</td><td>{data.authid}</td><td>{data.isadmin === 1 && 
                <button className="button-success pure-button" type="submit" onClick={() => { this.disableUser(name, data.isadmin);
                }}>True</button>}

          {data.isadmin === 0 && <button className="button-warning pure-button" onClick={() => { this.enableUser(name, data.isadmin);
         }}>False</button>}
         <button className="button-error pure-button" onClick={() => { this.deleteAdmin(parseInt(data.id));}}>X</button>
        </td>
            </tr>
          })
          let userResults = this.props.allUsers.map((data, i) => {
            let names = data.name;
         return <tr key={`${data.names}${i}`}>
         <td>{data.id}</td><td className='wordWrap'>{data.name}</td><td>{data.authid}</td><td><button className="button-warning pure-button" onClick={() => { this.createAdmin(data.name, data.id);
         }}>+</button></td></tr>
          });
        return (
            <div className='adminWrapper'>
            
            {this.props.user.name !== undefined && <div><h3 id='adminHeader'>User Admins</h3>
                <table className="pure-table pure-table-bordered center">
                <thead>
                    <tr>
                        <th>Name</th><th>Auth ID</th><th>Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {results}
                    </tbody>
                    <br></br>
                    </table>
                    <br></br>
                    <form onSubmit={this.formSubmit}>
                    <input type="text" name="Name" placeholder="Name" value={this.state.value} onChange={this.handleChange} ></input>
                    <input type="text" name="Authorization ID" placeholder="Auth ID" value={this.state.value2}onChange={this.handleChange2}></input>
                    <input type='submit' value=" + " />
                  </form> 
                 <h3> Users</h3>
                  <table  className="pure-table pure-table-bordered center">
                    <thead>
                        {userResults}
                    </thead>
                  </table>
                  
                  </div>}
            </div>
        )
    }
    }

    const mapStateToProps = state => state;

    export default withRouter(connect(mapStateToProps, { getAllUsers, getUserAdmins, enableAdmin, disableAdmin, createAdmin, deleteAdmin })(AdminPortal));