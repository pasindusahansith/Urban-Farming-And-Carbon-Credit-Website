import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/login';
import SignUp from './Pages/signup';
import Individual from './Pages/Individual';
import IndividualSignUpNext from './components/IndividualSignUpNext';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/individualSignUp" element={<Individual/>} />
          <Route path="/IndividualSignUpNext" element={<IndividualSignUpNext/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
