import { Component } from 'react';
import PropTypes from 'prop-types';

class Title extends Component {
    componentDidMount() {
        document.title = this.props.render
    }
    render(){
        return (null);
    }
}

Title.propTypes = {
    render: PropTypes.oneOfType([
        PropTypes.string
    ]).isRequired
}

export default Title