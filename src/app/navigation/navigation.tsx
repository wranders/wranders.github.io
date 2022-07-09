import React from 'react';
import {
  NavigationDrawerCopyrightEntity,
  NavigationDrawerExternalLinks,
  NavigationDrawerHeaderConfig,
  NavigationDrawerInternalLinks,
} from '.';
import NavigationBar from './navigationBar';
import NavigationDrawer from './navigationDrawer';
import NavigationDrawerContext from './navigationDrawerContext';

export default function Navigation(): React.ReactElement {
  const [open, setOpen] = React.useState<boolean>(false);

  function toggleDrawer(): void {
    setOpen(!open);
  }

  return (
    <NavigationDrawerContext.Provider
      value={{ open: open, toggle: toggleDrawer }}
    >
      <NavigationBar siteSource="https://github.com/wranders/wranders.github.io" />
      <NavigationDrawer
        header={NavigationDrawerHeaderConfig}
        internalLinks={NavigationDrawerInternalLinks}
        externalLinks={NavigationDrawerExternalLinks}
        copyright={NavigationDrawerCopyrightEntity}
      />
    </NavigationDrawerContext.Provider>
  );
}
