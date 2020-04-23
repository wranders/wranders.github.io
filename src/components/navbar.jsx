import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';

import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import GitHubIcon from '@material-ui/icons/GitHub';
import MenuIcon from '@material-ui/icons/Menu';

import { ThemeContext } from './theme';
import { NavDrawerContext } from './navdrawer';

const style = theme => ({
  appBarColor: theme.palette.primary,
  appBarOffset: theme.mixins.denseToolbar
});

const ThemeToggle = () => {
  return (
    <ThemeContext.Consumer>
      {({ useDark, toggle }) => (
        <Tooltip title='Toggle light/dark theme'>
          <IconButton color='inherit' onClick={toggle}>
            { useDark ? (
              <BrightnessHighIcon/>
            ) : (
              <Brightness4Icon/>
            )}
          </IconButton>
        </Tooltip>
      )}
    </ThemeContext.Consumer>
  );
}

class NavBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes, thisSource } = this.props;
    return (
      <div>
        <AppBar position='fixed' className={classes.appBarColor}>
          <Toolbar variant='dense'>
            <NavDrawerContext.Consumer>
              {({ toggle }) => (
                <IconButton edge='start' color='inherit' onClick={toggle}>
                    <MenuIcon/>
                </IconButton>
              )}
            </NavDrawerContext.Consumer>
            <div style={{ flex: 1 }}/>
            <ThemeToggle/>
            {typeof thisSource !== 'undefined' ? (
              <Tooltip title='View this page on Github'>
                <IconButton color='inherit' component='a'
                  href={thisSource}
                  target='_blank' rel='noopener noreferrer'
                >
                  <GitHubIcon/>
                </IconButton>
              </Tooltip>
            ):(<div/>)}
          </Toolbar>
        </AppBar>
        <div className={classes.appBarOffset}/>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object,
  thisSource: PropTypes.string
}

export default withStyles(style)(NavBar);