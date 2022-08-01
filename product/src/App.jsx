import React from "react";
import ReactDOM from "react-dom";
import './stylesheets/bootstrap.min.css'
import './stylesheets/index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ProductCatalog from "./components/ProductCatalog";



const App = () => (
    <Router>
      <ProductCatalog/>
    </Router>
    

);
ReactDOM.render(<App />, document.getElementById("app"));
