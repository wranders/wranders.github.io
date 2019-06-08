import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const LinkBox = (props) => {
    return (
        <div className={props.className}>
            {props.children}
        </div>
    )
}


LinkBox.propTypes = {
    className: PropTypes.string,
    children: function(props, propName, componentName) {
        const prop = props[propName];
        let error = null;
        React.Children.forEach(prop, function(child) {
            if (child.type !== Link && child.type !== (<a/>).type) {
                error = new Error(
                    '`' + componentName +
                    '` children should be of type `Link` or `a`.'
                )
            }
        })
        return error;
    }
}

export default LinkBox;