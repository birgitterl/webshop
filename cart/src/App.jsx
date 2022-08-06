import React from 'react';
import './stylesheets/bootstrap.min.css';
import './stylesheets/index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from './components/Cart';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Cart />} />
      </Routes>
    </Router>
  );
};

export default App;
