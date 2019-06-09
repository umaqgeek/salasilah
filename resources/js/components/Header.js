import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/img/Logo-01.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class Header extends Component {
  render() {

    var loggedInButtons;
    if (localStorage.getItem('authToken')) {
      loggedInButtons = (
        <div className="collapse navbar-collapse" id="navbarNav">
        </div>
      );
    } else {
      loggedInButtons = (
        <div className="collapse navbar-collapse" id="navbarNav">
          <Link to='/'>
            <button className='btn btn-block btn-primary' data-toggle="collapse" data-target="#navbarNav"><FontAwesomeIcon icon="home" />&nbsp; Home</button>
          </Link>
          <span className='mr-2'></span>
          <Link to='/register'>
            <button className='btn btn-block btn-success' data-toggle="collapse" data-target="#navbarNav"><FontAwesomeIcon icon="user-plus" />&nbsp; Register</button>
          </Link>
          <span className='mr-2'></span>
          <Link to='/about'>
            <button className='btn btn-block btn-secondary' data-toggle="collapse" data-target="#navbarNav"><FontAwesomeIcon icon="info" />&nbsp; About</button>
          </Link>
        </div>
      );
    }

    return (
      <nav className='navbar navbar-expand-md navbar-light navbar-laravel fixed-top'>
        <div className='container'>
          <Link className='navbar-brand' to='/'>
            <img src={logo} alt="Logo" style={{maxHeight: "50px"}} />
          </Link>

            <nav className="navbar navbar-expand-lg navbar-light">
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              {loggedInButtons}
            </nav>

        </div>
      </nav>
    );
  }
}

export default Header
