import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { auth } from '../firebase/index';
import NavBar from '../components/NavBar/navBar';
import RegisterForm from '../components/forms/register/registerForm';
import LoginForm from '../components/forms/Login/loginForm';
import LandingPage from '../components/LandingPage/landingPage';
import Home from '../components/Home/home';
import CardForm from '../components/forms/cardForm';
import Profile from '../components/Profile/profile';
import About from '../components/about/about';
import Cards from '../components/cards';
import CardItem from '../components/Home/cardItem';
import Footer from '../components/Footer/footer';
import Logout from '../components/logout';
import NotFound from '../components/notFound';
import CardView from '../components/Home/cardView';
import './App.css';

class App extends Component {
  state = {}

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if(user) {
        console.log(user);
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
            <Route path='/cards' component={Cards} />
            <Route path='/about' component={About} />
            <Route path='/profile/:id' render={props => {
              if(!user) {
                return <Redirect to='/login' />
              }
              return <CardForm {...props} user={user} /> 
            }}/>
            <Route path='/profile' render={props => <Profile {...props} user={user} />} />
            
            <Route path='/not-found' component={NotFound} />
            {/* <Route path='/:card' render={props => <Home {...props} />} /> */}
            <Route path='/:id' render={props => {
              if(user) {
                return <Home {...props} user={user} />
              }
              return <LandingPage {...props} />}
            }/>
            <Redirect from='/' exact to='/home' />
            <Redirect to='/not-found' />
          </Switch>
        </div>
          {/* <Footer /> */}
      </Fragment>
    );
  }
}

export default App;