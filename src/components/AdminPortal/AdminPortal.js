import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserAdmins } from "../../ducks/reducer";
import swal from 'sweetalert';

// import axios
import axios from 'axios';

class AdminPortal extends Component {
    constructor(){
        super();
        this.state = {
            rawData: [],
            userAdminsArr: [],
            counter: 1
        }
        this.disableUser = this.disableUser.bind(this);
    }
    componentDidMount(){
        this.props.getUserAdmins().then(response => {
            this.setState({rawData: response.action.payload});
        });   
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
              console.log(isadmin);
              axios.put(`/api/disable/${name}`).then(results=>{console.log(results)}).catch(console.log)
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
          console.log(isadmin);
          axios.put(`/api/enable/${name}`).then(results=>{console.log(results)}).catch(console.log)

        } else {
          swal("Action Successfully Canceled");
          return;
        }
        
      });
}

      render(){
        let results = [];
           results = this.state.rawData.map((data, i) => {
               let name = data.name;
            return <tr>
            <td>{data.name}</td><td>{data.authid}</td><td>{data.isadmin === 1 && 
                <button className="button-success pure-button" type="submit" onClick={() => { this.disableUser(name, data.isadmin) }}>True</button>}

          {data.isadmin === 0 && <button className="button-warning pure-button" onClick={() => { this.enableUser(name, data.isadmin) }}>False</button>}
        </td>
            </tr>
          })
        return (
            <div className='adminWrapper'>
            
            {this.props.user.name && <div><h1>User Admins</h1>
                <table className="pure-table pure-table-bordered">
                <thead>
                    <tr>
                        <th>Name</th><th>Auth ID</th><th>Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {results}
                    </tbody>
                    </table></div>}
                
            </div>
        )
    }
    }

    const mapStateToProps = state => state;

    export default withRouter(connect(mapStateToProps, { getUserAdmins })(AdminPortal));