import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Title from './titles';

import Landing from './landing';

export default class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Title />
                    <Switch>
                        <Route path="/" exact={true} component={Landing}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}
