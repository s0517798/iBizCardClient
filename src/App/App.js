import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar/navBar';
import Register from '../components/forms/register/register';
import Login from '../components/forms/Login/login';
import EditCardForm from '../components/forms/editCardForm';
import NotFound from '../components/notFound';
import Home from '../components/Home/home';
import Profile from '../components/Profile/profile';
import Logout from '../components/logout';
import LandingPage from '../components/LandingPage/landingPage';
import Footer from '../components/Footer/footer';
import About from '../components/about/about';
import auth from '../services/authService';
import './App.css';

class App extends Component {
  state = {}

componentDidMount() {
  const user = auth.getcurrentUser()
  this.setState({ user })
}

  render() {
    const { user } = this.state;
    return ( 
      <React.Fragment>
        <NavBar user={user} />
        <div className='app'>
          <Switch>
            <Route path='/logout' component={Logout} />
            <Route path='/home' render={props => <Home {...props} user={user} />} />
            <Route path='/about' render={props => <About {...props} user={user} />} />
            <Route path='/register' render={props => {
              if(!user) {
                return <Register {...props} /> 
              }
              return <Redirect to='/' />
            }}/>
  
            <Route path='/login' render={props => {
              if(!user) {
                return <Login {...props} /> 
              }
              return <Redirect to='/' />
            }}/>
  
            <Route path='/profile/:id' render={props => {
              if(!user) {
                return <Redirect to='/' />
              }
              return <EditCardForm {...props} user={user} /> 
            }}/>
            <Route path='/profile' render={props => <Profile {...props} user={user} />} />
            <Route path='/not-found' component={NotFound} />
            <Route path='/' render={props => {
              if(user) {
                return <Redirect to='/home' />
              }
              return <LandingPage {...props} user={user} />}
            }/>
            <Redirect to='/not-found' />
          </Switch>
        </div>
          {/* <Footer /> */}
      </React.Fragment>
    );
  }
}

export default App;