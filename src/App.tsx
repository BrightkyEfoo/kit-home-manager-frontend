import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Account from './pages/Account';
import Dashboard from './pages/Dashboard';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/account' element={<Account/>} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/contact' element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
