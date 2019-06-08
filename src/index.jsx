import React from 'react';
import { render } from 'react-dom';

import App from 'screens/app';

import './index.css';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(() => {
            console.log('SW registered');
        }).catch(() => {
            console.log('SW registration failed');
        });
    });
}

render(<App />, document.getElementById('root'))