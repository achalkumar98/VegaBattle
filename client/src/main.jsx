import React from 'react';
import ReactDOM from 'react-dom/client'; 
import App from './App';
import { UserProvider } from './UserContext'; 
import { ThemeProvider } from './ThemeContext'; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <ThemeProvider> 
        <App />
      </ThemeProvider>
    </UserProvider>
  </React.StrictMode>
);
