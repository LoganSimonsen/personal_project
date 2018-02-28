import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserAdmins } from "../../ducks/reducer";
import swal from 'sweetalert';

class AdminPortal extends Component {
    constructor(){
        super();
        this.state = {
            rawData: [],
            userAdminsArr: []
        }
        this.disableUser = this.disableUser.bind(this);
    }
    componentDidMount(){
        this.props.getUserAdmins().then(response => {
            this.setState({rawData: response.action.payload});
        });        
    }

    disableUser(){
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
            } else {
              swal("Action Successfully Canceled");
            }
          });
    }
      render(){
        let results = [];
           results = this.state.rawData.map((data, i) => {
            return <tr>
            <td>{data.name}</td><td>{data.authid}</td><td>{data.isadmin === 1 && 
                <button class="button-success pure-button" type="submit" onClick={() => { this.disableUser() }}>True</button>}

          {data.isadmin === 0 && <button class="button-warning pure-button">False</button>}
        </td>
            </tr>
          })
        return (
            <div className='adminWrapper'>
                <h1>User Admins</h1>
                <table className="pure-table pure-table-bordered">
                <thead>
                    <tr>
                        <th>Name</th><th>Auth ID</th><th>Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {results}
                    </tbody>
                    </table>
                <div></div>
            </div>
        )
    }
    }

    const mapStateToProps = state => state;

    export default withRouter(connect(mapStateToProps, { getUserAdmins })(AdminPortal));