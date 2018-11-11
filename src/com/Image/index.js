import React from 'react';

const Image = (props) => {
    return (<img src={props.img} style={props.style} alt={props.alt}/>)
};

export default Image;