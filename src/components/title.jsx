import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';

class Title extends React.Component {
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

const TitleLanding = () => <Title render="Welcome | DoUbleU"/>;

const Titles = () => {
    return (
        <Switch>
            <Route path="/" exact component={TitleLanding}/>
        </Switch>
    )
}

export default Titles;