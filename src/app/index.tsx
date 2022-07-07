import { green, red } from '@material-ui/core/colors';
import { ThemeOptions } from '@material-ui/core/styles';
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Contact from '@screens/contact/contact';
import E404 from '@screens/error/error404';
import Home from '@screens/home/home';
import Navigation from './navigation';
import AppContext from './appContext';

export default function App(): React.ReactElement {
  const appTheme: ThemeOptions = {
    mixins: {
      denseToolbar: {
        minHeight: 48,
      },
    },
    palette: {
      primary: green,
      secondary: red,
      type: 'light',
    },
  };

  return (
    <AppContext appTheme={appTheme} siteName="DoUbleU">
      <HashRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<E404 />} />
        </Routes>
      </HashRouter>
    </AppContext>
  );
}
