import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LinkBox extends Component {
    render() {
        return (
            <div className={this.props.className}>
                {this.props.children}
            </div>
        )
    }
}

LinkBox.propTypes = {
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