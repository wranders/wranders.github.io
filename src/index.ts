import React from 'react';
import ReactRouterDOM from 'react-dom';

import App from '@app';

ReactRouterDOM.render(
  React.createElement(App, null),
  document.getElementById('app-root'),
);
