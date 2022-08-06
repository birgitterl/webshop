import React, { Suspense } from 'react';
import './stylesheets/bootstrap.min.css';
import './stylesheets/index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
    <Suspense fallback="Loading...">
      <MFE />
    </Suspense>
  );
};

export default function App() {
  return (
    <Router>
      <div>
        <NavBar />
        <div>
          <Switch>
            <Route
              path="/"
              element={
                <React.Suspense fallback={<div>Loading home</div>}>
                  <LandingPage />
                </React.Suspense>
              }
            />
            <Route path="/products" render={(_) => renderMFE(ProductCatalog)} />
            <Route
              path="/details/:id"
              render={(_) => renderMFE(PurchaseContainer)}
            />
            <Route path="/cart" render={(_) => renderMFE(Cart)} />
            <Route path="/login" render={(_) => renderMFE(Login)} />
            <Route path="/register" render={(_) => renderMFE(Register)} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
