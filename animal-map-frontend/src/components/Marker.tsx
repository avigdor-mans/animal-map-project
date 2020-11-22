
import React from 'react';
import './Marker.css';

const Marker = (props: any) => {
  const { color, name, id, size } = props;
  return (
    <div>
      <div
        className="pin bounce"
        style={{ backgroundColor: color, cursor: 'pointer',
        //width: size, height: size
       }}
        title={name}
      />
      <div className="pulse" />
    </div>
  );
};

  export default Marker;