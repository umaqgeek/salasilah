import React, { Component } from 'react';
import Modal from 'react-responsive-modal';

class ModalBox extends Component {
  render() {

    let contact = '';
    if (this.props.isFooter) {
      contact = (
        <div className='mt-5'>{this.props.isFooter}</div>
      );
    }

    return (
      <Modal
        open={this.props.open}
        onClose={this.props.onCloseModal}
        center
      >
        <div className='container py-4' style={{width: '300px'}}>
          <center>
            <h4 style={{color: this.props.color}}>{this.props.message}</h4>
            {contact}
          </center>
        </div>
      </Modal>
    );
  };
};

export default ModalBox;
