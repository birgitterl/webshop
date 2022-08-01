import React from "react";
import ReactDOM from "react-dom";
import './stylesheets/bootstrap.min.css'
import './stylesheets/index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from "./components/LandingPage";



const App = () => (
    <Router><LandingPage />
    </Router>
    

);
ReactDOM.render(<App />, document.getElementById("app"));
