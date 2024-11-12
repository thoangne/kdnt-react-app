import React from 'react';
import ReactDOM from 'react-dom/client';
import { StrictMode } from 'react';
import { CssBaseline } from '@mui/material';
import { Provider } from 'react-redux';
import App from './App';
import { UserProvider } from './context/UserContext.tsx';
import { store } from './Admin1/redux/store.ts';
import reportWebVitals from './Admin1/reportWebVitals.ts';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <UserProvider>
        <CssBaseline />
        <App />
      </UserProvider>
    </Provider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
