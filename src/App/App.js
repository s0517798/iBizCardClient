import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth, storage } from '../firebase/index';
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
  state = {
    photoUrl: 'http://via.placeholder.com/150x130',
    displayName: '',
    email: ''
  }

  componentDidMount() {
    auth.onAuthStateChanged(async (user) => {
      if(user) {
        const { displayName, email } = user
        this.setState({ user, displayName, email })
        await storage
        .ref(`users/${user.uid}/04_Desktop.jpg`)
        .getDownloadURL()
        .then(photoUrl => {
          this.setState({ photoUrl })
        })
      }
    })
    
  }
  render() {
    const { user, photoUrl, displayName, email } = this.state;
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
            <Route path='/profile' render={props => <Profile {...props} user={user} photoUrl={photoUrl} displayName={displayName} email={email} />} />
            
            <Route path='/not-found' component={NotFound} />
            <Route path='/cards/:id' render={props => <Cards {...props} photoUrl={photoUrl} />} />
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