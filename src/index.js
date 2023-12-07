import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Navbar from './components/Navbar';
import App from './App';
import DayPlanner from './components/dayplanner/Dayplanner';
<<<<<<< HEAD
// import FlightAPI from './components/FlightAPI';
=======

>>>>>>> 7bd196287bbed33d3f946a38425525417d3f35a3

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" Component={App} />
        <Route path="/Dayplanner" Component={DayPlanner}/>
<<<<<<< HEAD
        {/* <Route path="/trip-planner" Component={FlightAPI} /> */}
=======
>>>>>>> 7bd196287bbed33d3f946a38425525417d3f35a3
        <Route path="/about-us" Component={App} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
