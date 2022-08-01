import React from "react";
import ReactDOM from "react-dom";
import './stylesheets/bootstrap.min.css'
import './stylesheets/index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Purchase from "./components/Purchase";



const App = () => (
    <Router>
      <Purchase/>
    </Router>
    

);
ReactDOM.render(<App />, document.getElementById("app"));
