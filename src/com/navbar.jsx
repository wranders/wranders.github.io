import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

const NavBar = (props) => {
    return (
        <nav className={props.className}>
            {React.Children.map(props.children, child => {
                return React.cloneElement(child, {
                    className: props.childClass,
                    activeClassName: props.activeClassName
                })
            })}
        </nav>
    )
}

NavBar.propTypes = {
    className: PropTypes.string,
    childClass: PropTypes.string,
    activeClassName: PropTypes.string.isRequired,
    children: function(props, propName, componentName) {
        const prop = props[propName]
        let error = null
        React.Children.forEach(prop, function(child){
            if (child.type !== NavLink) {
                error = new Error(
                    '`' + componentName + 
                    '` children should be of type `NavLink`.'
                )
            }
        })
        return error
    }
}

export default NavBar;