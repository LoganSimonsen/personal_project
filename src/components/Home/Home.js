import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Chart from '../Charts/Chart';
import { getUser } from "../../ducks/reducer";

class Home extends Component {
  componentDidMount() {
    this.props.getUser();
  }
  render() {
    return (
      <div className='App'>
      {this.props.isLoading && <div className="load-wrapp">
            <div className="load-2">
                <img className='loadingGif' src='http://www.villacarlotta.it/images/loading.gif' alt='Loading'></img>
            </div>
        </div>}
        { this.props.user.id > 0  && <div className='buttonContainer'>
        <Link to='/Chart' className='LinkWrap'><button className='homeButtons'><h1>MONITOR</h1></button></Link>

        <Link to='/Report' className='LinkWrap'><button className='homeButtons'><h1>REPORT</h1></button></Link>

        <Link to='/AdminPortal' className='LinkWrap'><button className='homeButtons'><h1>ADMINISTRATE</h1></button></Link>

        </div>}
      </div>
    );
  }
}

const mapStateToProps = state => state;

export default withRouter(connect(mapStateToProps, { getUser })(Home));