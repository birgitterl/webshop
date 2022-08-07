import React, { Suspense } from 'react';
import { Spinner } from 'react-bootstrap';
import './stylesheets/bootstrap.min.css';
import './stylesheets/index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

const LandingPage = React.lazy(() => import('account/LandingPage'));
const ProductCatalog = React.lazy(() => import('product/ProductCatalog'));
const PurchaseContainer = React.lazy(() => import('purchase/Purchase'));
const Cart = React.lazy(() => import('cart/Cart'));
const Login = React.lazy(() => import('account/Login'));
const Register = React.lazy(() => import('account/Register'));

const renderMFE = (MFE) => {
  return (
    <Suspense
      fallback={
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      }
    >
      <MFE />
    </Suspense>
  );
};

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={renderMFE(LandingPage)} />
        <Route path="/products" element={renderMFE(ProductCatalog)} />
        <Route path="/details/:id" element={renderMFE(PurchaseContainer)} />
        <Route path="/cart" element={renderMFE(Cart)} />
        <Route path="/login" element={renderMFE(Login)} />
        <Route path="/register" element={renderMFE(Register)} />
      </Routes>
      <Footer />
    </Router>
  );
};
export default App;
