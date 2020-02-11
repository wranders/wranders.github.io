import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Title from 'com/title';

const Titles = () => {
    return (
        <Switch>
            <Route path="/" exact component={defaultTitle}/>
        </Switch>
    )
}

const defaultTitle = () => <Title render="Welcome | DoUbleU"/>;

export default Titles;