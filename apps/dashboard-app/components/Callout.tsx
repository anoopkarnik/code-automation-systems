// components/Callout.js
import React from 'react';

const Callout = ({ children, type = 'note' }:any) => {

  return (
    <div style={{backgroundColor: '#ff8111', borderLeft: '4px solid #66023c', padding: '10px', margin: ' 20px 0px'}}>
      {children}
    </div>
  );
};

export default Callout;
