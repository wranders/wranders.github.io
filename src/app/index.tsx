import React from 'react';
import { ThemeOptions } from '@mui/material';
import { green, red } from '@mui/material/colors';
import AppContext from './appContext';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Navigation from '$app/navigation';
import Home from '$screens/home';
import { Error404 } from '$screens/error';
import Contact from '$screens/contact';

const appTheme: ThemeOptions = {
  mixins: {
    denseToolbar: {
      minHeight: 48,
    },
  },
  palette: {
    primary: green,
    secondary: red,
    mode: 'light',
  },
};

export default function App(): React.ReactElement {
  return (
    <AppContext appTheme={appTheme} siteName="DoUbleU">
      <HashRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </HashRouter>
    </AppContext>
  );
}
