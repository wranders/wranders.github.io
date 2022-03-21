import NavBar from '@Components/NavBar';
import NavDrawer from '@Components/NavDrawer';
import { NavDrawerContextProvider } from '@Components/NavDrawerContext';
import Avatar from '@material-ui/core/Avatar';
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import GithubIcon from '@material-ui/icons/GitHub';
import HomeIcon from '@material-ui/icons/Home';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import React from 'react';

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
            icon: <HomeIcon />,
            label: 'Home',
          },
          {
            href: '/contact',
            icon: <AlternateEmailIcon />,
            label: 'Contact',
          },
        ]}
        externalLinks={[
          {
            icon: <GithubIcon />,
            label: 'Github',
            href: 'https://github.com/wranders',
          },
          {
            icon: <LibraryBooksIcon />,
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
