import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh';
import GithubIcon from '@material-ui/icons/GitHub';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { NavDrawerContext, NavDrawerContextConsumer } from './NavDrawerContext';
import ThemeContext from './ThemeContext';

function ThemeToggle(): React.ReactElement {
  const themeCtx = React.useContext(ThemeContext);

  if (themeCtx === null) return <div>NULL</div>;

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton color="inherit" onClick={themeCtx.toggle}>
        {themeCtx.useDark ? <BrightnessHighIcon /> : <Brightness4Icon />}
      </IconButton>
    </Tooltip>
  );
}

type NavBarProps = {
  siteSource?: string;
};

export default function NavBar({
  siteSource,
}: NavBarProps): React.ReactElement {
  const classes = makeStyles((theme: Theme) =>
    createStyles({
      appBarOffset: theme.mixins.denseToolbar,
    }),
  )();

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <NavDrawerContextConsumer>
            {(navDrawerContext: NavDrawerContext | null) =>
              navDrawerContext && (
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={navDrawerContext.toggle}
                >
                  <MenuIcon />
                </IconButton>
              )
            }
          </NavDrawerContextConsumer>
          <div style={{ flex: 1 }} />
          <ThemeToggle />
          {typeof siteSource !== 'undefined' ? (
            <Tooltip title="View this page on Github">
              <IconButton
                color="inherit"
                component="a"
                href={siteSource}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon />
              </IconButton>
            </Tooltip>
          ) : null}
        </Toolbar>
      </AppBar>
      <div className={classes.appBarOffset} />
    </div>
  );
}
