import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import NavBar from './components/navBar';
import RegisterForm from './components/forms/registerForm';
import LoginForm from './components/forms/loginForm';
import EditCardForm from './components/forms/editCardForm';
import AddCardForm from './components/forms/addCardForm';
import NotFound from './components/notFound';
import Home from './components/Home/home';
// import Cards from './components/cards';
import Authenticator from './components/authenticator';
import Profile from './components/profile';
import Logout from './components/logout';



const App = () => {

  const [user, setUser] = useState()
  useEffect(() => {
    try{
      // get the token
    const jwt = localStorage.getItem('token')
    // get us the current user object
    const currentUser = jwtDecode(jwt)
    setUser(currentUser)
    } catch(ex) {}
  }, []);


  return ( 
    <React.Fragment>
      <NavBar user={user}/>
      <main className='container'>
        <Switch>
          <Route path='/home' render={props => <Home {...props} user={user} />} />
          <Route path='/register' component={RegisterForm} />
          <Route path='/login' component={LoginForm} />
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
          <Route path='/profile' render={props => <Profile {...props} user={user} />} />
          <Route path='/not-found' component={NotFound} />
          <Route path='/' exact render={props => {
            if(user) {
              return <Redirect to='/home' />
            }
            return <Authenticator {...props} user={user} />}
          }  />
          {/* <Redirect from='/' exact to='/card' /> */}
          <Redirect to='/not-found' />
        </Switch>
      </main>
    </React.Fragment>
   );
}
 
export default App;