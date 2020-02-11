import React from 'react';
import { render } from 'react-dom';

import App from 'screens/app';

import './index.css';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(() => {
            // eslint-disable-next-line no-console 
            console.log('SW registered');
        }).catch(() => {
            // eslint-disable-next-line no-console
            console.log('SW registration failed');
        });
    });
}

render(<App />, document.getElementById('app-root'))