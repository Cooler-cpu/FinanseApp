import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import {MainPage} from './pages/MainPage'
import {AuthPage} from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import TargetPage from './pages/TargetPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
      return (
        <Switch>
           <Route path="/profile" exact>
            <ProfilePage></ProfilePage>
          </Route> 
          <Route path="/target" exact>
            <TargetPage></TargetPage>
          </Route>
          <Route path="/app" exact>
            <MainPage />
          </Route>

          <Redirect to="/app" />
        </Switch>
      )
    }
  
    return (
      <Switch>
        <Route path="/" exact>
          <AuthPage />
        </Route>
        <Redirect to="/" />
      </Switch>
    )
  }