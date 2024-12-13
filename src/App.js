import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import Login from './Pages/login';
import SignUp from './Pages/signup';
import Individual from './Pages/Individual';
import NonGovenment from './Pages/NonGov';
import Govenment from './Pages/Gov';
import Userprofile from './Pages/Userprofile';
import CarbonCredit from './Pages/CarbonCredit';
import CalcIndividual from './Pages/CalcIndividual';


const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/individualSignUp" element={<Individual/>} />
          <Route path="/Nongovenment" element={<NonGovenment/>} />
          <Route path="/Govenment" element={<Govenment/>} />
          <Route path="/Userprofile" element={<Userprofile />} />
          <Route path="/CarbonCredit" element={<CarbonCredit />} />
          <Route path="/CalcIndividual" element={<CalcIndividual />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
