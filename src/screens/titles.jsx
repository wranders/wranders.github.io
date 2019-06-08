import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Title from 'com/title';

export default function() {
    return (
        <Switch>
            <Route path="/" exact component={defaultTitle}/>
        </Switch>
    )
}

const defaultTitle = () => <Title render="Welcome | DoUbleU"/>;