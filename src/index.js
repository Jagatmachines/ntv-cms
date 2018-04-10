import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';

const firebaseConfig = JSON.parse(process.env.REACT_APP_FIREBASE);

firebase.initializeApp(firebaseConfig);
firebase.firestore();

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
