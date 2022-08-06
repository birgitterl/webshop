import React from 'react';
import './stylesheets/bootstrap.min.css';
import './stylesheets/index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Purchase from './components/Purchase';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Purchase />} />
      </Routes>
    </Router>
  );
};

export default App;
