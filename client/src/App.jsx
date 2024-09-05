import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import BattlePage from '../src/scenes/battlepage'; // Ensure the correct path
import HomePage from '../src/scenes/homepage'; // Example HomePage component
import Login from '../src/scenes/loginpage'; // Import the Login component
import { useUserContext } from './UserContext'; // Import the user context

const App = () => {
  const { user } = useUserContext(); // Access user context

  return (
    <Router>
      <Routes>
        {/* Redirect to homepage if user is authenticated */}
        <Route path="/" element={user ? <Navigate to="/home" /> : <Login />} />
        <Route path="/home" element={user ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/battle-arena" element={user ? <BattlePage /> : <Navigate to="/" />} />
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </Router>
  );
};

export default App;
