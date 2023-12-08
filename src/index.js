import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import App from './App';
import DayPlanner from './components/dayplanner/Dayplanner';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={App} />
        <Route path="/Dayplanner" Component={DayPlanner}/>
        <Route path="/about-us" Component={App} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
