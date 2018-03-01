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
      console.log(temp);
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
      <img id='headerLogo' src='http://www.favicon.cc/logo3d/914733.png' alt={require('./logo.png')}></img>
      <br></br>
      <a href={process.env.REACT_APP_LOGIN}>
        { this.props.user.id === undefined && <p className="button-small pure-button">Login</p> }
        
      </a>
      <a href={process.env.REACT_APP_LOGOUT}>
      { this.props.user.id > 0  && <p className="button-small pure-button" onClick={this.handleClick}>Logout</p> }
      </a>
      <a href={process.env.REACT_APP_LOGOUT}>
      { this.props.user.id > 0  && <Link to='/' className="button-small pure-button">home</Link> }
      </a>
      
      {this.props.user.authid && <img className='profileImage' src={imgTemp} alt='http://s3.amazonaws.com/37assets/svn/765-default-avatar.png'></img>}
      {this.props.user ? (
        <div>
         {this.props.user.id > 0 && <span id='welcome'>Welcome {this.props.user.name}</span>}
        </div>
      ) : (
        <h1>{this.props.errMessage}</h1>
      )}
      { this.props.user.id === undefined && <span className='welcomeHeaderWrap'><h2 className='welcomeHeader'>Welcome to DashyBoards!</h2></span>}
      </div>
    </header>
    )
}
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser, getUserAdmins, logout })(Header));