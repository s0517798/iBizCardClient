import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Amplify from 'aws-amplify';
import aws_exports from './aws-exports'

import NavBar from './components/navBar';
import RegisterForm from './components/forms/registerForm';
import LoginForm from './components/forms/loginForm';
import EditCardForm from './components/forms/editCardForm';
import AddCardForm from './components/forms/addCardForm';
import NotFound from './components/notFound';
import Home from './components/Home/home';
// import Cards from './components/cards';
import authenticator from './components/authenticator';
import Profile from './components/profile';
import Logout from './components/logout';

Amplify.configure(aws_exports);


const App = () => {

  const [user, setUser] = useState()
  useEffect(() => {
    try{
      // get the token
    const jwt = localStorage.getItem('token')
    // get us the current user object
    // console.log('token:',jwt);
    const currentUser = jwtDecode(jwt)
    setUser(currentUser)
    // console.log('decode:',currentUser);
    } catch(ex) {}
  }, []);

  return ( 
    <React.Fragment>
      <NavBar user={user}/>
      <main className='container'>
        <Switch>
          <Route path='/authenticator' component={authenticator} />
          <Route path='/register' component={RegisterForm} />
          <Route path='/login' component={LoginForm} />
          <Route path='/logout' component={Logout} />
          <Route path='/profile/new' component={AddCardForm} />
          <Route path='/profile/:id' component={EditCardForm} />
          <Route path='/profile' component={Profile} />
          <Route path='/not-found' component={NotFound} />
          <Route path='/' exact component={Home} />
          {/* <Redirect from='/' exact to='/card' /> */}
          <Redirect to='/not-found' />
        </Switch>
      </main>
    </React.Fragment>
   );
}
 
export default App;