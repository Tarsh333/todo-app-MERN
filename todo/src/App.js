import React, { useState,useEffect } from 'react'

import { BrowserRouter as Router, Route, Switch,Redirect } from 'react-router-dom'
import Main from './main'
import Login from './Login'
function App() {
  const [profile,setProfile]=useState(JSON.parse(localStorage.getItem('profile')))
  const delUser=()=>{
setProfile(null)
  }
  const addUser=()=>{
    setProfile(JSON.parse(localStorage.getItem('profile')))

  }
  return (
    <Router>
      <Switch>
      <Route exact path='/'> {profile?.token?<Main delUser={delUser} />:<Redirect to="/auth"/>}</Route>
      <Route exact path='/auth'> {!profile?.token?<Login addUser={addUser} />:<Redirect to="/"/>}</Route>
      

      </Switch>
    </Router>
  )
}

export default App
