import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';
// вытащить из библеотект , и назвать его Router
import {BrowserRouter as Router} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);


