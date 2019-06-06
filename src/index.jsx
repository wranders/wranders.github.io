import React, { Component } from 'react';
import { render } from 'react-dom';
import './index.css';

import App from 'screens/app';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}

render(<App />, document.getElementById('root'))