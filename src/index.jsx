import React from 'react';
import { render } from 'react-dom';
import './index.css';

import App from 'screens/app';

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