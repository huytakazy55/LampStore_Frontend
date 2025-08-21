import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './i18n';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './Services/CheckTokenStatus';
import { ThemeProvider } from './ThemeContext.jsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 phút - thời gian data được coi là fresh
      cacheTime: 10 * 60 * 1000, // 10 phút - thời gian giữ data trong cache
      retry: 2, // Retry 2 lần nếu request fail
      refetchOnWindowFocus: false, // Không refetch khi focus lại window
      refetchOnMount: true, // Refetch khi component mount
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
      {/* DevTools chỉ hiển thị trong development */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
