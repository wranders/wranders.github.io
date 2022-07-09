import { Avatar } from '@mui/material';
import Navigation from './navigation';
import {
  NavigationDrawerCopyright,
  NavigationDrawerHeader,
  NavigationDrawerLink,
} from './navigationDrawer';
import React from 'react';
import {
  AlternateEmail,
  GitHub,
  Home,
  LibraryBooks,
} from '@mui/icons-material';

export const DrawerWidth = 250;

export const NavigationDrawerHeaderConfig: NavigationDrawerHeader = {
  href: '/',
  title: 'DoUbleU',
  icon: <Avatar src="/static/icons/favicon-194x194.png" />,
};

export const NavigationDrawerInternalLinks: Array<NavigationDrawerLink> = [
  {
    href: '/',
    label: 'Home',
    icon: <Home />,
  },
  {
    href: '/contact',
    label: 'Contact',
    icon: <AlternateEmail />,
  },
];

export const NavigationDrawerExternalLinks: Array<NavigationDrawerLink> = [
  {
    href: 'https://github.com/wranders',
    label: 'Github',
    icon: <GitHub />,
  },
  {
    href: 'https://docs.doubleu.codes/',
    label: 'Documentation',
    icon: <LibraryBooks />,
  },
];

export const NavigationDrawerCopyrightEntity: NavigationDrawerCopyright = {
  start: '2018',
  end: new Date().getFullYear().toString(),
  entity: 'doubleu.codes',
  entitiyLink: 'https://www.doubleu.codes/',
};

export default Navigation;
