import React from 'react';

import Avatar from '@material-ui/core/Avatar';

import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import GitHubIcon from '@material-ui/icons/GitHub';
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

import NavBar from './components/navbar';
import NavDrawer, { NavDrawerContext } from './components/navdrawer';

const headLink = {
  title:  'DoUbleU',
  icon:   <Avatar src='/static/icons/favicon-194x194.png'/>,
  ref:    '/'
}

const copyright = {
  start:      '2018',
  entity:     'doubleu.codes',
  entityLink: 'https://www.doubleu.codes/'
}

const internalLinks = [
  {
    label: 'Home',
    icon: <HomeIcon/>,
    path: '/'
  },
  {
    label: 'Contact',
    icon: <AlternateEmailIcon/>,
    path: '/contact'
  }
]

const externalLinks = [
  {
    label: 'Github',
    icon: <GitHubIcon/>,
    path: 'https://github.com/wranders'
  },
  {
    label: 'Documentation',
    icon: <LibraryBooksIcon/>,
    path: 'https://www.doubleu.codes/docs'
  }
]

class Navigation extends React.Component {
  constructor() {
    super();
    this.state = {
      drawerOpen: false
    }
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }

  toggleDrawer() {
    this.setState({
      drawerOpen: !this.state.drawerOpen
    });
  }

  render() {
    const { drawerOpen } = this.state;
    return(
      <NavDrawerContext.Provider value={{
        open: drawerOpen,
        toggle: this.toggleDrawer
      }}>
        <NavBar thisSource='https://github.com/wranders/wranders.github.io'/>
        <NavDrawer
          headLink={headLink}
          internalLinks={internalLinks}
          externalLinks={externalLinks}
          copyright={{...copyright, end: new Date().getFullYear().toString()}}
        />
      </NavDrawerContext.Provider>
    );
  }
}

export default Navigation;