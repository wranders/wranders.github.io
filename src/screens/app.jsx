import React, { Component } from 'react';
import { HashRouter as Router, NavLink, Route, Switch } from 'react-router-dom';

import NavBar from 'com/nav';
import Landing from 'screens/landing/landing';

import Title from './titles';


import './navbar.css';

export default class App extends Component {
    render() {
        return (
            <Router>
                <Title />
                <NavBar className="topnav"
                        childClass="navitem" 
                        activeClassName="active">
                    <NavLink to="/" exact>Home</NavLink>
                </NavBar>
                <Switch>
                    <Route path="/" exact component={Landing}/>
                </Switch>
            </Router>
        )
    }
}
