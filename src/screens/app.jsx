import React from 'react';
import { HashRouter as Router, NavLink, Route, Switch } from 'react-router-dom';

import NavBar from 'com/navbar';
{/*import About from 'screens/about/about';*/}
import Landing from 'screens/landing/landing';

import Title from './titles';

import './navbar.css';

const App = () => {
    return (
        <Router>
            <Title />
            <NavBar className="topnav"
                    childClass="navitem" 
                    activeClassName="active">
                <NavLink to="/" exact>Home</NavLink>
                {/*<NavLink to="/about" exact>About</NavLink>*/}
            </NavBar>
            <Switch>
                <Route path="/" exact component={Landing}/>
                {/*<Route path="/about" exact component={About}/>*/}
            </Switch>
        </Router>
    )
}

export default App;