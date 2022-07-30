import React from "react";
import ReactDOM from "react-dom";
import './bootstrap.min.css'
import './index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import NavBar from "./NavBar";
import Footer from "./Footer";

const App = () => (
    <Router>
        <NavBar/>
        <Footer />
    </Router>
    

);
ReactDOM.render(<App />, document.getElementById("app"));
