import './bootstrap';

import 'whatwg-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import 'nprogress/nprogress.css';
import './index.css';

import NProgress from 'nprogress';

NProgress.configure({
  showSpinner: false,
});

/**
 * Here we render all the react app to the element with the id "root".
 * You can find that element in index.html in the public folder.
 */
ReactDOM.render(<App />, document.getElementById('root'));
