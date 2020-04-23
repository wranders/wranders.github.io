import React from 'react';
import ReactRouterDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';

import Navigation from './navigation';

import ThemeWrapper from './components/theme';
import { TitleProvider } from './components/title';

import ErrNotFound from './screens/errNotFound';
import Contact from './screens/contact';
import Home from './screens/home';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(() => {
      console.log('SW registered');
    }).catch(() => {
      console.log('SW registration failed');
    });
  });
}

class App extends React.Component {
  render() {
    return (
      <ThemeWrapper>
        <TitleProvider siteName='DoUbleU'>
          <HashRouter>
            <Navigation/>
            <Switch>
              <Route path='/' exact component={Home}/>
              <Route path='/contact' exact component={Contact}/>
              <Route component={ErrNotFound}/>
            </Switch>
          </HashRouter>
        </TitleProvider>
      </ThemeWrapper>
    )
  }
}

ReactRouterDOM.render(<App />, document.getElementById('app-root'));