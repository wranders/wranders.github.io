import { ThemeContext } from '$app/theme';
import { Brightness4, BrightnessHigh, GitHub, Menu } from '@mui/icons-material';
import { AppBar, IconButton, styled, Toolbar, Tooltip } from '@mui/material';
import React from 'react';
import NavigationDrawerContext, {
  NavigationDrawerContextType,
} from './navigationDrawerContext';

interface NavigationBarProps {
  siteSource?: string;
}

export default function NavigationBar({
  siteSource,
}: NavigationBarProps): React.ReactElement {
  const AppBarOffset = styled('div')(({ theme }) => theme.mixins.denseToolbar);

  function renderThemeToggle(): React.ReactElement | null {
    const themeCtx = React.useContext(ThemeContext);

    if (!themeCtx) return null;

    return (
      <Tooltip title="Toggle light/dark theme">
        <IconButton color="inherit" onClick={themeCtx.toggle}>
          {themeCtx.useDark ? <BrightnessHigh /> : <Brightness4 />}
        </IconButton>
      </Tooltip>
    );
  }

  function renderSiteSourceLink(): React.ReactElement | null {
    if (typeof siteSource === 'undefined') return null;

    return (
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
    );
  }

  return (
    <div>
      <AppBar enableColorOnDark position="fixed">
        <Toolbar variant="dense">
          <NavigationDrawerContext.Consumer>
            {(navDrawerCtx: NavigationDrawerContextType | null) =>
              navDrawerCtx && (
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={navDrawerCtx?.toggle}
                  aria-label="Open Menu"
                >
                  <Menu />
                </IconButton>
              )
            }
          </NavigationDrawerContext.Consumer>
          <div style={{ flex: 1 }} />
          {renderThemeToggle()}
          {renderSiteSourceLink()}
        </Toolbar>
      </AppBar>
      <AppBarOffset />
    </div>
  );
}
