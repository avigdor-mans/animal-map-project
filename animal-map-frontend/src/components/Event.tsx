import React from 'react';

interface IProps  {
    lat: any
    lng: any
    text: any
  }

export const Event = React.memo<IProps>((props)=>{
  return (
    <div className="Event"
      style={{cursor: 'pointer' }}
    >{props.text}</div>
  );
})

export default Event