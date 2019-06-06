import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Title from 'com/Title';

export default function() {
    return (
        <Switch>
            <Route path="/" exact={true} component={defaultTitle}/>
        </Switch>
    )
}

const defaultTitle = () => <Title render="Welcome | DoUbleU"/>