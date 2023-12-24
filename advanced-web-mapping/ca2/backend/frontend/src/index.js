import { App } from "./components/App";

import '../static/css/App.css';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/static/service-worker.js').then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch(function(error) {
      console.log('Service Worker registration failed:', error);
    });
  }
  