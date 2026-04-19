import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './i18n';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './Services/CheckTokenStatus';
import { ThemeProvider } from './ThemeContext.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <App />
      </ThemeProvider>

    </QueryClientProvider>
  </Provider>,
);

reportWebVitals();
