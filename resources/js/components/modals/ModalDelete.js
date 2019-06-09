import React, { Component } from 'react';

import Modal from 'react-responsive-modal';

class ModalDelete extends Component {
  constructor(props) {
    super(props);
    this.onNoDelete = this.onNoDelete.bind(this);
    this.onYesDelete = this.onYesDelete.bind(this);
  };

  onNoDelete() {
    this.props.history.push(this.props.backUrl);
  };

  onYesDelete() {
    this.props.onDelete();
  };

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
            <h4 style={{color: this.props.color}}>
              {this.props.message}
              <br /><br />
              <button type='button' onClick={this.onYesDelete} className='btn btn-danger' style={{paddingLeft: 30, paddingRight: 30}}>Yes</button>
              <button type='button' onClick={this.onNoDelete} className='btn' style={{paddingLeft: 30, paddingRight: 30}}>No</button>
            </h4>
            {contact}
          </center>
        </div>
      </Modal>
    );
  };
};

export default ModalDelete;
