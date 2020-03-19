import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Titles from 'Components/title';
import Landing from 'Screens/landing';
import { NavTop, NavBottom } from 'Components/nav';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(() => {
            // eslint-disable-next-line no-console 
            console.log('SW registered');
        }).catch(() => {
            // eslint-disable-next-line no-console
            console.log('SW registration failed');
        });
    });
}

const App = () => {
    return (
        <HashRouter>
            <Titles />
            <NavTop />
            <Switch>
                <Route path="/" exact component={Landing}/>
            </Switch>
            <NavBottom />
        </HashRouter>
    )
}

render(<App />, document.getElementById('app-root'))