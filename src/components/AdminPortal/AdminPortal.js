import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { getUserAdmins, enableAdmin, disableAdmin } from "../../ducks/reducer";
import swal from 'sweetalert';
// import axios
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
    }
    componentDidMount(){
        this.props.getUserAdmins();
        // this.props.getUserAdmins().then(response => {
        //     this.setState({rawData: response.action.payload});
        // });   
        // setInterval(function(){
        //     axios.get(`/api/gettrans`).then(results=>{
        //         console.log('interval');
        //         console.log('getinterval', results)});
        //     },5001);
    }

    // componentWillUpdate(nextProps, nextState) {
    //     if (nextState.open == true && this.state.open == false) {
    //       this.props.onWillOpen();
    //     }
    //   }

    shouldComponentUpdate() {
        console.log('Hit');
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
            //   axios.put(`/api/disable/${name}`).then(results=>{
                //   console.log('disable', results);
                //   this.setState({rawData: results.data}, this.forceUpdate());
                //   console.log('currentState', this.props.userAdmins);
                //   componentShouldUpdate(){return true};
                // }).catch(console.log);
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
          this.props.enableAdmin(name)
        //   axios.put(`/api/enable/${name}`).then(results=>{
        //     console.log('disable', results);
        //     console.log('currentState', this.state.rawData);
        //     this.setState({rawData: results.data}, this.forceUpdate());
            // componentShouldUpdate(){return true};
        //   }).catch(console.log)
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
    // that = this;
    console.log('target values', this.state.value, this.state.value2);
    swal({
        title: "Are you sure you want to add this Admin?",
        text: "Once added, user will have access to Admin functions",
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
          return;
        }
        
      });
    event.preventDefault();
}

      render(){
          console.log('RERENDER', this.props.userAdmins)
          const {formSubmit} = this.state;
           let results = this.props.userAdmins.map((data, i) => {
               console.log('DATA: ', data)
               let name = data.name;
            return <tr key={`${data.name}${i}`}>
            <td>{data.name}</td><td>{data.authid}</td><td>{data.isadmin === 1 && 
                <button className="button-success pure-button" type="submit" onClick={() => { this.disableUser(name, data.isadmin);
                console.log('In MAP: ', this.props.userAdmins[i]);
                }}>True</button>}

          {data.isadmin === 0 && <button className="button-warning pure-button" onClick={() => { this.enableUser(name, data.isadmin);
         }}>False</button>}
        </td>
            </tr>
          })
        return (
            <div className='adminWrapper'>
            
            {this.props.user.name !== undefined && <div><h1 style={{color: 'white'}}>User Admins</h1>
                <table className="pure-table pure-table-bordered center">
                <thead>
                    <tr>
                        <th>Name</th><th>Auth ID</th><th>Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {results}
                    </tbody>
                    </table>
                    <br></br>
                    <form onSubmit={this.formSubmit}>
                    <input type="text" name="Name" placeholder="Name" value={this.state.value} onChange={this.handleChange} ></input>
                    <input type="text" name="Authorization ID" placeholder="Auth ID" value={this.state.value2}onChange={this.handleChange2}></input>
                    <input type='submit' value=" + " />
                  </form> </div>}
            </div>
        )
    }
    }

    const mapStateToProps = state => state;

    export default withRouter(connect(mapStateToProps, { getUserAdmins, enableAdmin, disableAdmin })(AdminPortal));