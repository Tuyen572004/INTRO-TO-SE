import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import App from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from "./store/store";
import { AuthProvider } from './contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </PersistGate>
  </Provider>
);

