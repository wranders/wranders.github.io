import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Title from 'com/title';

export default function() {
    return (
        <Switch>
            <Route path="/" exact component={defaultTitle}/>
            {/*<Route path="/about" exact component={aboutTitle}/>*/}
        </Switch>
    )
}

const defaultTitle = () => <Title render="Welcome | DoUbleU"/>;
/*const aboutTitle = () => <Title render="About | DoUbleU"/>;*/