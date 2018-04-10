import React, { Component } from 'react';
/* import logo from './logo.svg'; */
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import RoutingComponent from './routes';

class App extends Component {
  render() {
    return (
      <RoutingComponent/>
    );
  }
}

export default App;
