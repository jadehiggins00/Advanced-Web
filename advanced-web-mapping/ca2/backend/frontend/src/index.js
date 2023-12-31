import React from 'react';
import ReactDOM from 'react-dom/client';
import  App  from "./components/App";
import 'leaflet/dist/leaflet.css';

import '../static/css/App.css';

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/serviceworker.js').then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch(function(error) {
      console.log('Service Worker registration failed:', error);
    });
  }

  const rootElement = document.getElementById('app');
  if (!rootElement) {
    throw new Error('Failed to find the root element');
  }
  
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );  