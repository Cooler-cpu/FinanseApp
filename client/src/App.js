import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from './routes'
import {useAuth} from './hooks/auth.hook';
import {AuthContext} from './context/AuthContext'


import NavState from './context/navState';
import MainMenu from './components/MainMenu';

//import 'materialize-css';

function App() {


  const {token, login, logout, userId} = useAuth() 
  const isAuthenticated = !!token

  const routes = useRoutes(isAuthenticated)  
  return (
    <AuthContext.Provider value={{   
      token, login, logout, userId, isAuthenticated
    }}>
      <Router>

        { isAuthenticated &&
          <NavState>
           <MainMenu />
         </NavState>  

         }
        
        <div class="container">
          {routes}
          <div className="footer-logo">
            <p>© FinanseGuru ™ 2020-2021</p>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  )
}

export default App;
