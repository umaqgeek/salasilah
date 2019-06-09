import React, { Component } from 'react';
import axios from 'axios';
import LoadingBadge from './LoadingBadge';
import ModalBox from './ModalBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getSqlErrors } from '../utilities/Errors';

class LoginPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataServer: {
        username: '',
        password: '',
      },
      loadingText: '',
      boxModal: {
        isModal: false,
        message: '',
        color: ''
      }
    };
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
    this.onClear = this.onClear.bind(this);

    // redirect page to manage list if already login.
    const { history } = this.props;
    if (localStorage.getItem('authToken')) {
      history.push('/dashboard');
    }
  };

  handleFieldChange(event) {
    this.setState({
      ...this.state,
      dataServer: {
        ...this.state.dataServer,
        [event.target.name]: event.target.value
      }
    })
  };

  onLogin() {
    const { history } = this.props;

    var auth = {
      code: this.state.dataServer.username,
      ic: this.state.dataServer.password
    };

    axios.post('/api/login', auth)
    .then(response => {
      localStorage.setItem('userId', response.data.success.user_id);
      localStorage.setItem('authToken', response.data.success.token);
      axios.defaults.headers.common['Authorization'] = 'Bearer '.concat(response.data.success.token);
      history.push('/dashboard');
    })
    .catch(error => {
      this.setState({
        ...this.state,
        boxModal: {
          isModal: true,
          message: getSqlErrors(error.response.data.error),
          color: 'red'
        }
      });
    });
  };

  onClear() {
    this.setState({
      ...this.state,
      dataServer: {
        username: '',
        password: '',
      }
    });
  };

  render() {

    let onCloseModal = () => {
      this.setState({
        ...this.state,
        boxModal: {
          isModal: false,
          message: '',
          color: ''
        }
      });
    };

    return (
      <div className='container'>
        <br />
        <div className='col-md-12 card card-body'>
          <center className=''>

            <ModalBox
              open={this.state.boxModal.isModal}
              message={this.state.boxModal.message}
              color={this.state.boxModal.color}
              onCloseModal={onCloseModal}
            />

            <br /><br />

            <img src='images/Logo-01.png' style={{maxHeight: 100, maxWidth: 250}} />

            <br /><br />

            <h3>GENEOLOGY</h3>

            <div className='col-md-5'>
              <hr />
              <input
                type='text'
                className='form-control'
                placeholder='Enter your username here'
                name='username'
                value={this.state.dataServer.username}
                onChange={this.handleFieldChange}
              />

            <br />

              <input
                type='password'
                className='form-control'
                placeholder='Enter your password here'
                name='password'
                value={this.state.dataServer.password}
                onChange={this.handleFieldChange}
              />

            <br />

          <button type='submit' className='btn btn-success mr-3' onClick={this.onLogin}><FontAwesomeIcon icon="sign-in-alt" />&nbsp; Submit</button>
          <button type='button' className='btn btn-dark' onClick={this.onClear}> Clear </button>
            </div>

          <br />
          <div className='mt-3'><br /></div>
          <div className='mt-2'><br /></div>
          <div>
            <center>
              <a href='https://www.facebook.com/kidzeclipes' target='_blank'>Developed by Umar Mukhtar</a> <br />
            <a href='http://tuffah.info' target='_blank'>Version 1.0.1, 2019</a>
            </center>
          </div>

          <div className='mt-5'><br /></div>

          </center>
        </div>
      </div>
    );
  };
};

export default LoginPage;
