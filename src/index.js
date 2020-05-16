import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.min.css';

import { Provider } from 'react-redux';
import store from './redux/store';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <CssBaseline />
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
