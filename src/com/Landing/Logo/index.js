import React from 'react';

class Logo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <img src={this.props.img} style={this.props.style}/>
        );
    }
}

export default Logo;