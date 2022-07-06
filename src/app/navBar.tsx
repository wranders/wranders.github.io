import { AppBar, IconButton, Toolbar, Tooltip } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Brightness4, BrightnessHigh, GitHub, Menu } from '@material-ui/icons';
import React from 'react';

import { NavDrawerContext, NavDrawerContextConsumer } from './navDrawerContext';
import ThemeContext from './themeContext';

function ThemeToggle(): React.ReactElement {
  const themeCtx = React.useContext(ThemeContext);

  if (themeCtx === null) return <div>NULL</div>;

  return (
    <Tooltip title="Toggle light/dark theme">
      <IconButton color="inherit" onClick={themeCtx.toggle}>
        {themeCtx.useDark ? <BrightnessHigh /> : <Brightness4 />}
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
                  aria-label="Open Menu"
                >
                  <Menu />
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
                <GitHub />
              </IconButton>
            </Tooltip>
          ) : null}
        </Toolbar>
      </AppBar>
      <div className={classes.appBarOffset} />
    </div>
  );
}
