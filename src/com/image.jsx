import React from 'react';
import PropTypes from 'prop-types';

const Image = (props) => {
    return(
        <img src={props.img} className={props.class} alt={props.alt}/>
    )
}

Image.propTypes = {
    img: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    class: PropTypes.string
}

export default Image;