import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import {MainPage} from './pages/MainPage'
import {DetailPage} from './pages/DetailPage'
import {AuthPage} from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated) {
      return (
        <Switch>
           <Route path="/profile" exact>
            <ProfilePage></ProfilePage>
          </Route> 
          <Route path="/app" exact>
            <MainPage />
          </Route>
          <Route path="/detail/:id">
            <DetailPage />
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