import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import NavBar from '../components/NavBar/navBar';
import RegisterForm from '../components/forms/register/registerForm';
import LoginForm from '../components/forms/Login/loginForm';
import EditCardForm from '../components/forms/editCardForm';
import AddCardForm from '../components/forms/addCardForm';
import NotFound from '../components/notFound';
import Home from '../components/Home/home';
import Profile from '../components/profile';
import Logout from '../components/logout';
import LandingPage from '../components/LandingPage/landingPage';

import './App.css';

const App = () => {

  const [user, setUser] = useState()
  useEffect(() => {
    try{
      // get the token
    const jwt = localStorage.getItem('accesstoken')
    // get us the current user object
    const currentUser = jwtDecode(jwt)
    setUser(currentUser)
    } catch(ex) {}
  }, []);

  return ( 
    <React.Fragment>
      { user && <NavBar user={user}/> }
      <main className='container'>
        <Switch>
          <Route path='/home' render={props => <Home {...props} user={user} />} />
          <Route path='/accounts/register' component={RegisterForm} />
          <Route path='/accounts/login' component={LoginForm} />
          <Route path='/logout' component={Logout} />
          <Route path='/profile/new' render={props => {
                if(!user) {
                  return <Redirect to='/' />
                }
                return <AddCardForm {...props} /> 
              }} />
          <Route path='/profile/:id' render={props => {
                if(!user) {
                  return <Redirect to='/' />
                }
                return <EditCardForm {...props} /> 
              }} />
          <Route path='/:id' render={props => <Profile {...props} user={user} />} />
          <Route path='/not-found' component={NotFound} />
          <Route path='/' exact render={props => {
            if(user) {
              return <Redirect to='/home' />
            }
            return <LandingPage {...props} user={user} />}
          }  />
          <Redirect to='/not-found' />
        </Switch>
      </main>
    </React.Fragment>
   );
}
 
export default App;