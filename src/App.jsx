import React, { Component } from 'react';
/* import logo from './logo.svg'; */
import './App.css';
import RoutingComponent from './routes';
import './components/firebase/firebase';
import withAuthentication from './components/firebase/withAuthentication'

class App extends Component {
  render() {
    return (
      <RoutingComponent/>
    );
  }
}

export default withAuthentication(App);
