import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import axios from 'axios';

import thunk from 'redux-thunk'; 

import {createStore, applyMiddleware} from "redux"
import { Provider } from 'react-redux';
import { reducers } from './state/reducers';
import {composeWithDevTools} from  "redux-devtools-extension"

axios.defaults.baseURL = "http://localhost:2000"

const myStore = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider  store={myStore}>
          <App />
    </Provider>   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
