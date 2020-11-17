import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext'
import {Navbar} from './components/Navbar'
import 'materialize-css';

function App() {
  const {token, login, logout, userId} = useAuth()  // get data and methods with hook useAuth() if data exist
  const isAuthenticated = !!token
  //we need to pass these values ​​through the context to the all application
  const routes = useRoutes(isAuthenticated)  //is the user authenticated
  return (
    <AuthContext.Provider value={{   // pass to the context through the provider, the values ​​from the hook
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>
        { isAuthenticated && <Navbar/>}
        <div class="container">
          {routes}
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
