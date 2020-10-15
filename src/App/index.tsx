import Theme from '@Components/Theme';
import TitleProvider from '@Components/TitleProvider';
import { ThemeOptions } from '@material-ui/core/styles';
import { green, red } from '@material-ui/core/colors';
import Contact from '@Screens/Contact/Contact';
import E404 from '@Screens/Error/404';
import Home from '@Screens/Home/Home';
import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
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
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/contact" exact component={Contact} />
            <Route component={E404} />
          </Switch>
        </HashRouter>
      </TitleProvider>
    </Theme>
  );
}
