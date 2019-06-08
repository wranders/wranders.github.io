import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class NavBar extends Component {
    render() {
        return (
            <nav className={this.props.className}>
                {React.Children.map(this.props.children, child => {
                    return React.cloneElement(child, {
                        className: this.props.childClass,
                        activeClassName: this.props.activeClassName
                    })
                })}
            </nav>
        )
    }
}

NavBar.propTypes = {
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