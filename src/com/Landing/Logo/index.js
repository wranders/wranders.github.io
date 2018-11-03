import React from 'react';

class Logo extends React.Component {
    render() {
        return (
            <img src={this.props.img} style={this.props.style} alt={this.props.alt}/>
        );
    }
}

export default Logo;