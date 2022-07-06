import { Avatar } from '@material-ui/core';
import { AlternateEmail, GitHub, Home, LibraryBooks } from '@material-ui/icons';
import React from 'react';

import NavBar from './navBar';
import NavDrawer from './navDrawer';
import { NavDrawerContextProvider } from './navDrawerContext';

export default function Navigation(): React.ReactElement {
  const [drawerOpen, setDrawerOpen] = React.useState<boolean>(false);

  function ToggleDrawerOpen() {
    setDrawerOpen(!drawerOpen);
  }

  return (
    <NavDrawerContextProvider
      value={{
        open: drawerOpen,
        toggle: ToggleDrawerOpen,
      }}
    >
      <NavBar siteSource="https://github.com/wranders/wranders.github.io" />
      <NavDrawer
        header={{
          href: '/',
          icon: <Avatar src="/static/icons/favicon-194x194.png" />,
          title: 'DoUbleU',
        }}
        internalLinks={[
          {
            href: '/',
            icon: <Home />,
            label: 'Home',
          },
          {
            href: '/contact',
            icon: <AlternateEmail />,
            label: 'Contact',
          },
        ]}
        externalLinks={[
          {
            icon: <GitHub />,
            label: 'Github',
            href: 'https://github.com/wranders',
          },
          {
            icon: <LibraryBooks />,
            label: 'Documentation',
            href: 'https://docs.doubleu.codes/',
          },
        ]}
        copyright={{
          start: '2018',
          end: new Date().getFullYear().toString(),
          entity: 'doubleu.codes',
          entityLink: 'https://www.doubleu.codes/',
        }}
      />
    </NavDrawerContextProvider>
  );
}
