import React from 'react';

const Image = (props) => {
    return(
        <img src={props.img} className={props.class} alt={props.alt}/>
    )
}

export default Image;