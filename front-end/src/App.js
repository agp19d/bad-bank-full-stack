/**
 * @author Alejandro Garcia de Paredes
 * @created July 27, 2023
 * @modified July 31, 2023
 **/

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CreateAccount from './components/CreateAccount';
import Account from './components/Account';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import AllData from './components/AllData'; 

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/all-data" element={<AllData />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
