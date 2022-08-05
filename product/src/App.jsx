import React from "react";
import ReactDOM from "react-dom";
import './stylesheets/bootstrap.min.css'
import './stylesheets/index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductCatalog from "./components/ProductCatalog";
import ProductDetails from"./components/ProductDetail";



const App = () => (
    <Router>
      <Switch>
        <Route exact path="/" component={ProductCatalog}/>
        <Route path="/details/:id" component={ProductDetails}/>
      </Switch>
    </Router>
    

);
ReactDOM.render(<App />, document.getElementById("app"));
