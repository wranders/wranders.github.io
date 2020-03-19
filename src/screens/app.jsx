import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import Landing from 'Screens/landing';

import Title from './titles';

const App = () => {
    return (
        <HashRouter>
            <Title />
            <Navbar fixed="top" collapseOnSelect expand="sm" variant="dark">
                <Navbar.Brand>DoUbleU</Navbar.Brand>
                <Navbar.Toggle/>
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

export default App;