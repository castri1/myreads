import React from 'react';
import PropTypes from 'prop-types';
import './Loading.css';

const Loading = (props) => {
  const { pendingRequest } = props;
  if (pendingRequest) {
    return (<div className="loading"></div>);
  }
  return null;
};

Loading.propTypes = {
  pendingRequest: PropTypes.bool.isRequired
};

export default Loading;