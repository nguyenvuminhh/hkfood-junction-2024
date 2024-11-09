import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ProgressProvider } from './context/ProgressContext.jsx';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import store from './store';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <StrictMode>
      <ProgressProvider>
        <App />
      </ProgressProvider>
    </StrictMode>
  </Provider>
);
