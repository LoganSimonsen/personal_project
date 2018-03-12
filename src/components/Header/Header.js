import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { getUser } from "../../ducks/reducer";
import { getUserAdmins } from "../../ducks/reducer";
import { logout } from "../../ducks/reducer";

let temp = ''
let x = '';
class Header extends Component {
constructor(){
 super();
 this.state = {
  gitID: '',
}
 this.handleClick = this.handleClick.bind(this);
}
  componentDidMount() {
    this.props.getUser().then((response)=> {
      temp = response.value.authid;
    });
  }

  handleClick(event){
    event.preventDefault();
    this.props.logout();
    this.props.getUser();
  }

  render(){
    temp = temp.replace(/github|/gi, '');
    temp = temp.replace(/\|/g, "");
    let imgTemp = ('https://avatars1.githubusercontent.com/u/'+ temp +'?s=460&v=4' );
    return (
    <header className="App-header">
      
      <div>
      <img id='headerLogo' src={require('./logo.png')} alt={require('./logo.png')}></img>
      <br></br>
      <div className='loginButtonWrapper'>
      <a href={process.env.REACT_APP_LOGIN} >
        { this.props.user.id === undefined && <p className="button-small pure-button loginButton" ><h1>Welcome to DashyBoards!</h1><br></br><h4>Click to Login</h4><img src='http://www.favicon.cc/logo3d/914733.png'></img></p>
      }
      </a>
      </div>
      <a href={process.env.REACT_APP_LOGOUT}>
      { this.props.user.id > 0  && <p className="button-small pure-button" onClick={this.handleClick}>Logout</p> }
      </a>
      <a href={process.env.REACT_APP_LOGOUT}>
      { this.props.user.id > 0  && <Link to='/' className="button-small pure-button">Home</Link> }
      </a>
      
      {this.props.user.authid && <img className='profileImage' src={imgTemp} alt='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'></img>}
      {this.props.user ? (
        <div>
         {this.props.user.id > 0 && <span id='welcome'>Welcome {this.props.user.name}</span>}
        </div>
      ) : (
        <h1>{this.props.errMessage}</h1>
      )}
      </div>
    </header>
    )
}
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser, getUserAdmins, logout })(Header));