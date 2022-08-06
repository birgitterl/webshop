import React from 'react';
import './stylesheets/bootstrap.min.css';
import './stylesheets/index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductCatalog from './components/ProductCatalog';
import ProductDetails from './components/ProductDetail';

const App = () => (
  <Router>
    <Routes>
      <Route exact path="/" element={<ProductCatalog />} />
      <Route path="/details/:id" element={<ProductDetails />} />
    </Routes>
  </Router>
);
export default App;
