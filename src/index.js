import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './store/modules/music';
import { BrowserRouter } from 'react-router-dom';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, devTools);

const setScreenSize = () => {
  let vw = window.innerWidth;
  let vh = window.innerHeight;
  
  document.documentElement.style.setProperty('--vw', `${vw}px`);
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

const resetScreenSize = () => {
  window.addEventListener('resize', () => setScreenSize());
}

const removeEvent = e => {
  e.preventDefault();
  e.stopPropagation();
}

const disableScroll = () => {
  document.querySelector('body').addEventListener('touchmove', removeEvent, { passive: false });
  document.querySelector('body').addEventListener('onclick', removeEvent, { passive: false });
  document.querySelector('body').addEventListener('mousewheel', removeEvent, { passive: false });
}

const init = () => {
  setScreenSize();
  resetScreenSize();
  disableScroll();
}

init();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
