import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import M from 'materialize-css';

//import logo from './logo.svg';
//import './App.css';

function App() {
  const routes = useRoutes(false)
  return (
    <Router>
      <div class="container">
        {routes}
      </div>
    </Router>
  )
}

export default App;
