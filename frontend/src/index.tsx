import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import ReactDom from 'react-dom';
import App from './App';
import './styles/index.css';

ReactDom.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
