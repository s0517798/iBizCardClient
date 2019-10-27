import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

import config from './aws-exports';
import Amplify from 'aws-amplify';
Amplify.configure(config);

ReactDOM.render(
<BrowserRouter>
  <App />
</BrowserRouter>, document.getElementById('root'));
