// import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './App.css'
import 'antd/dist/antd.css'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute'
import Landing from './pages/Landing'
import Login from './pages/Login'
import VolunteerSignup from './pages/VolunteerSignup'
import PartnerSignup from './pages/PartnerSignup'
import VolunteerDashboard from './pages/VolunteerDashboard'
import PartnerDashboard from './pages/PartnerDashboard'
import { AuthContext, useAuth } from './utils/auth'
import API from './utils/API'
// import { withUser, update } from './utils/withUser'
function App (props) {
  const existingTokens = JSON.parse(localStorage.getItem('tokens'))
  const [authTokens, setAuthTokens] = useState(existingTokens)

  const setTokens = data => {
    if (Object.keys(data).length > 0)
      localStorage.setItem('tokens', JSON.stringify(data))
    setAuthTokens(data)
  }

  useEffect(() => {
    API.getUser().then(res => {
      console.log(res.data)
      return setTokens(res.data)
    })
  }, [])

  return (
    <div className='App'>
      {/* <AuthContext.Provider value={true}> */}
      <AuthContext.Provider value={{ authTokens, setAuthTokens: setTokens }}>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Landing />
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>
            <Route exact path='/signup/volunteer'>
              <VolunteerSignup />
            </Route>
            <Route exact path='/signup/partner'>
              <PartnerSignup />
            </Route>
            <ProtectedRoute
              exact
              path='/user/dashboard'
              component={PartnerDashboard}
            />
            <ProtectedRoute
              exact
              path='/user/dashboard'
              component={VolunteerDashboard}
            />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  )
}

export default App
// export default withUser(App)
