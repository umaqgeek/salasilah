import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ComponentAddPassengers = (props) => (
  <div className='form-inline' style={{marginBottom: 10}}>
    <input
      name='name'
      type='text'
      className='form-control'
      placeholder='Type name here'
      style={{marginRight: 10}}
      onChange={props.onHandler}
    />
    <input
      name='ic'
      type='text'
      className='form-control'
      placeholder='Type NRIC number here'
      style={{marginRight: 10}}
      onChange={props.onHandler}
    />
    <input
      name='phone'
      type='text'
      className='form-control'
      placeholder='Type phone number here'
      style={{marginRight: 10}}
      onChange={props.onHandler}
    />
  <button type='button' className='btn btn-dark' onClick={props.onRemove}><FontAwesomeIcon icon="minus-circle" />&nbsp; Remove</button>
  </div>
);

export default ComponentAddPassengers;
