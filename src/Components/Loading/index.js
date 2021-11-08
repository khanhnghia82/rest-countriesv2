import React from 'react';
import './loading.css'

function Loading(props) {
  return (
    <div className="loading">
      <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>    
    </div>
  );
}

export default Loading;