import './index.css';

import { ProgressProvider } from '@bprogress/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ProgressProvider color="var(--progress-color)" height="3px">
      <App />
    </ProgressProvider>
  </React.StrictMode>
);
