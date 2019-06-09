import React, { Component } from 'react';

class LoadingBadge extends Component {
  render() {
    return (
      <span style={{color: 'blue'}}>{this.props.text}</span>
    );
  };
};

export default LoadingBadge;
