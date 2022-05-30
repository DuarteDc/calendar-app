import React from 'react';
import ReactDOM from 'react-dom/client';

import './styles.css';

import CalendarApp from './CalendarApp';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <CalendarApp />
  </React.StrictMode>
);
