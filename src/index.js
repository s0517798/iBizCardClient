import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import App from './App/App';
import aws_exports from './aws-exports';
import Amplify from 'aws-amplify';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

Amplify.configure(aws_exports);

ReactDOM.render(
<BrowserRouter>
  <App />
</BrowserRouter>, document.getElementById('root'));
