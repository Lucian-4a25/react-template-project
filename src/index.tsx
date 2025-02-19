import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './redux/store';
import '@assets/styles/index.css';
import '@assets/styles/global.scss';
// import { CONFIG } from '@/config/index';

const root = createRoot(document.getElementById('root') as HTMLElement);

// console.log('CONFIG: ', CONFIG);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
