import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../src/scenes/homepage';
import LoginPage from '../src/scenes/loginpage';
import ProfilePage from '../src/scenes/profilepage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={ <HomePage />} />
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} />
        
      </Routes> 
    </Router>
  );
};

export default App;
