import React from 'react';
import './stylesheets/bootstrap.min.css';
import './stylesheets/index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Cart from './components/Cart';
import TinyCart from './components/TinyCart';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Cart />} />
        <Route path="/tinycart" element={<TinyCart />} />
      </Routes>
    </Router>
  );
};

export default App;
