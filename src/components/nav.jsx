import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

export const NavTop = () => {
    return (
        <Navbar fixed="top" collapseOnSelect expand="sm" variant="dark">
            <Navbar.Brand>DoUbleU</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                <LinkContainer to="/" exact>
                    <Nav.Link>Home</Nav.Link>
                </LinkContainer>
            </Navbar.Collapse>
        </Navbar>
    )
}

export const NavBottom = () => {
    return (
        <Navbar fixed="bottom">
            <Navbar.Text>
                &copy; <b>2018-2020</b> doubleu.codes All Rights Reserved
            </Navbar.Text>
        </Navbar>
    )
}