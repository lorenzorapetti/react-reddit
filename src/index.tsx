import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider } from '@material-ui/core/styles';
import * as React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { themeLight } from './themes';

import './index.css';

/**
 * Here we render all the react app to the element with the id "root".
 * You can find that element in index.html in the public folder
 */
ReactDOM.render(
  <>
    {/* This is an helper component that outputs some reset styles, similar to normalize.css */}
    <CssBaseline />
    <MuiThemeProvider theme={themeLight}>
      <App />
    </MuiThemeProvider>
  </>,
  document.getElementById('root'),
);
