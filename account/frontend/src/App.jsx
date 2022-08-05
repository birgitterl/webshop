import React from "react";
import './stylesheets/bootstrap.min.css'
import './stylesheets/index.css'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from "./components/LandingPage";
import Login from "./components/Login"
import Register from "./components/Register"

const renderMFE = (MFE) => {
    return(
            <MFE />
    )
};
export default function App() {
    return(
        <Router>
            <div>
                <Switch>  
                    <Route exact path="/" render={_ => renderMFE(LandingPage)}/>
                    <Route path="/login" render={_ => renderMFE(Login)}/>
                    <Route path="/register" render={_ => renderMFE(Register)}/>            
                </Switch>
            </div>      
        </Router>        
    )

};
