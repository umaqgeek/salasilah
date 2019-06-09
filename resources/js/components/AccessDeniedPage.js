import React, { Component } from 'react';
import axios from 'axios';
import LoadingBadge from './LoadingBadge';
import ModalBox from './ModalBox';
import { getSqlErrors } from '../utilities/Errors';

class AccessDeniedPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataServer: {
        api: '/api/logout'
      },
      loadingText: '',
      boxModal: {
        isModal: true,
        message: 'Access Denied',
        color: 'red'
      }
    };
    this.onLogout = this.onLogout.bind(this);
  };

  componentDidMount() {
    this.onLogout();
    localStorage.clear();
  };

  onLogout() {
    axios.post(this.state.dataServer.api, {
      user_id: localStorage.getItem('userId')
    })
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
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

      const { history } = this.props;
      history.push('/');
    };

    return (
      <div className='container py-4'>
        <div className='row justify-content-center'>
          <div className='col-md-6'>
            <div className='card'>
              <div className='card-body' style={{height: 600}}>

                <ModalBox
                  open={this.state.boxModal.isModal}
                  message={this.state.boxModal.message}
                  color={this.state.boxModal.color}
                  onCloseModal={onCloseModal}
                />

              <br />

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
};

export default AccessDeniedPage;
