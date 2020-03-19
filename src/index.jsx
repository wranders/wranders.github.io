import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Titles from 'Components/title';
import Landing from 'Screens/landing';

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
            <Navbar fixed="top" collapseOnSelect expand="sm" variant="dark">
                <Navbar.Brand>DoUbleU</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse>
                    <LinkContainer to="/" exact>
                        <Nav.Link>Home</Nav.Link>
                    </LinkContainer>
                </Navbar.Collapse>
            </Navbar>
            <Switch>
                <Route path="/" exact component={Landing}/>
            </Switch>
            <Navbar fixed="bottom">
                <Navbar.Text>
                    &copy; <b>2018-2020</b> doubleu.codes All Rights Reserved
                </Navbar.Text>
            </Navbar>
        </HashRouter>
    )
}

render(<App />, document.getElementById('app-root'))