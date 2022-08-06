import React from 'react';
import './stylesheets/bootstrap.min.css';
import './stylesheets/index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Purchase from './components/Purchase';

export default function App() {
  return (
    <Router>
      <Purchase />
    </Router>
  );
}
