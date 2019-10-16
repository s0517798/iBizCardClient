import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/navBar';
import RegisterForm from './components/forms/registerForm';
import LoginForm from './components/forms/loginForm';
import EditCardForm from './components/forms/editCardForm';
import AddCardForm from './components/forms/addCardForm';
import NotFound from './components/notFound';

import Home from './components/Home/home';
import Cards from './components/cards';


const App = () => {
  return ( 
    <div>
      <NavBar />
      <div className='container'>
        <Switch>
          <Route path='/register' component={RegisterForm} />
          <Route path='/login' component={LoginForm} />
          <Route path='/cards/new' component={AddCardForm} />
          <Route path='/cards/:id' component={EditCardForm} />
          <Route path='/cards' component={Cards} />
          <Route path='/not-found' component={NotFound} />
          <Route path='/' exact component={Home} />
          {/* <Redirect from='/' exact to='/card' /> */}
          <Redirect to='/not-found' />
        </Switch>
      </div>
    </div>
   );
}
 
export default App;