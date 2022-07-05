import { green, red } from '@material-ui/core/colors';
import { ThemeOptions } from '@material-ui/core/styles';
import React from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';

import Theme from '@Components/Theme';
import TitleProvider from '@Components/TitleProvider';
import Contact from '@Screens/Contact/Contact';
import E404 from '@Screens/Error/E404';
import Home from '@Screens/Home/Home';
import Navigation from './Navigation';

export default function App(): React.ReactElement {
  const AppTheme: ThemeOptions = {
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
    <Theme appTheme={AppTheme} darkModeKey="themeDarkMode">
      <TitleProvider siteName="DoUbleU">
        <HashRouter>
          <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<E404 />} />
          </Routes>
        </HashRouter>
      </TitleProvider>
    </Theme>
  );
}
