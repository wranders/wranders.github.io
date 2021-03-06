import React from 'react';
import ReactRouterDOM from 'react-dom';
import App from './App';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => {
        console.log('ServiceWorker registered');
      })
      .catch(() => {
        console.log('ServiceWorker registration failed');
      });
  });
}

ReactRouterDOM.render(
  React.createElement(App, null),
  document.getElementById('app-root'),
);
