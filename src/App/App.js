import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Auth } from 'aws-amplify';

import NavBar from '../components/NavBar/navBar';
import Register from '../components/forms/register/register';
import Login from '../components/forms/Login/login';
import EditCardForm from '../components/forms/editCardForm';
import AddCardForm from '../components/forms/addCardForm';
import NotFound from '../components/notFound';
import Home from '../components/Home/home';
import Profile from '../components/Profile/profile';
import Logout from '../components/logout';
import LandingPage from '../components/LandingPage/landingPage';

import './App.css';
import Footer from '../components/Footer/footer';
import { async } from 'q';

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

  const refreshToken = async () => {
    try{
      const cognitoUser = await Auth.currentAuthenticatedUser()
      const currentSession =  await Auth.currentSession();
      console.log(currentSession);
      // cognitoUser.refreshSession(currentSession.refreshToken, (err, session) => {
      //   console.log('session', err, session);
      //   const { idToken, refreshToken, accessToken } = session;

      // })
    }catch(ex) {
      console.log('Not able to refresh token', ex);
    }
  }

  console.log(refreshToken());

  return ( 
    <React.Fragment>
      { user && <Route render={props => <NavBar {...props} user={user}/>} /> }
      <div id='app'>
        <Switch>
          <Route path='/home' render={props => <Home {...props} user={user} />} />
          <Route path='/accounts/register' render={props => {
                if(!user) {
                  return <Register {...props} /> 
                }
                return <Redirect to='/' />
              }} />

          <Route path='/accounts/login' render={props => {
                if(!user) {
                  return <Login {...props} /> 
                }
                return <Redirect to='/' />
              }} />

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
                return <EditCardForm {...props} user={user} /> 
              }} />
              
          <Route path='/:username' render={props => <Profile {...props} user={user} />} />
          <Route path='/not-found' component={NotFound} />
          <Route path='/' render={props => {
            if(user) {
              return <Redirect to='/home' />
            }
            return <Login {...props} user={user} />}
          }  />
          <Redirect to='/not-found' />

        </Switch>
      </div>
        {/* <Footer /> */}
    </React.Fragment>
   );
}
 
export default App;