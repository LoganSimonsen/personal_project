import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserAdmins } from "../../ducks/reducer";

class AdminPortal extends Component {
    constructor(){
        super();
        this.state = {
            rawData: [],
            userAdminsArr: []
        }
    }
    componentDidMount(){
        this.props.getUserAdmins().then(response => {
            this.setState({rawData: response.action.payload});
        });        
    }


      render(){
        let results = [];
           results = this.state.rawData.map((data, i) => {
            return <tr>
            <td>{data.name}</td><td>{data.authid}</td><td>{data.isadmin === 1 && 'YES'}{data.isadmin === 0 && 'No'}</td>
            </tr>
          })
        return (
            <div className='adminWrapper'>
                <h1>User Admins</h1>
                <table className="pure-table pure-table-bordered">
                <thead>
                    <tr>
                        <th>Name</th><th>Auth ID</th><th>Is Admin</th>
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