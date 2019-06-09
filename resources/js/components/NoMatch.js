import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class NoMatch extends Component {
  render() {
    return (
      <div className='container'>
        <br />
        <div className='col-md-12 card card-body'>
          <center className=''>
              <br /><br />
              <h2>Ops!<br />Nothing to see here.</h2>
              <br /><br />
              <Link to='/'>
                <button type='button' className='btn btn-primary mt-4'><FontAwesomeIcon icon="home" />&nbsp; Go to Home</button>
              </Link>

              <div className='mt-5'><br /></div>

            </center>
          </div>
        </div>
    );
  };
};

export default NoMatch;
