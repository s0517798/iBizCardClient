import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth } from '../firebase/index';
import NavBar from '../components/NavBar/navBar';
import RegisterForm from '../components/forms/register/registerForm';
import LoginForm from '../components/forms/Login/loginForm';
import LandingPage from '../components/LandingPage/landingPage';
import Cards from '../components/Cards/cards';
import CardForm from '../components/forms/cardForm';
import Profile from '../components/Profile/profile';
import About from '../components/about/about';
import Logout from '../components/logout';
import NotFound from '../components/notFound';
import './App.css';

class App extends Component {
  state = {}

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if(user) {
        this.setState({ user })
      }
    })
    
  }
  render() {
    const { user } = this.state;
    return ( 
      <Fragment>
        <NavBar user={user} />
        <div className='app'>
          <Switch>
            <Route path='/logout' component={Logout} />
            <Route path='/register' component={RegisterForm} />
  
            <Route path='/login' render={props => {
              if(user) {
                return <Redirect to='/' />
              }
              return <LoginForm {...props} user={user} /> 
            }} />
            <Route path='/about' component={About} />
            <Route path='/profile/:id' render={props => {
              if(!user) {
                return <Redirect to='/login' />
              }
              return <CardForm {...props} user={user} /> 
            }}/>
            <Route path='/profile' render={props => <Profile {...props} user={user} />} />
            
            <Route path='/not-found' component={NotFound} />
            <Route path='/cards' render={props => <Cards {...props} />} />
            <Route path='/' render={props => {
              if(user) {
                return <Cards {...props} user={user} />
              }
              return <LandingPage {...props} />}
            }/>
            <Redirect from='/' exact to={user ? '/cards': '/home'} />
            <Redirect to='/not-found' />
          </Switch>
        </div>
          {/* <Footer /> */}
      </Fragment>
    );
  }
}

export default App;