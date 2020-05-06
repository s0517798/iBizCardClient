import React, { Component, Fragment } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from '../components/NavBar/navBar';
import Register from '../components/forms/register/register';
import Login from '../components/forms/Login/login';
import CardForm from '../components/forms/cardForm';
import NotFound from '../components/notFound';
import Home from '../components/Home/home';
import Profile from '../components/Profile/profile';
import Logout from '../components/logout';
import LandingPage from '../components/LandingPage/landingPage';
import Footer from '../components/Footer/footer';
import About from '../components/about/about';
import auth from '../services/authService';
import './App.css';
import Cards from '../components/cards';
import CardItem from '../components/Home/cardItem';

class App extends Component {
  state = {}

  componentDidMount() {
    const user = auth.getcurrentUser()
    auth.refreshToken()
    this.setState({ user })
  }
  render() {
    const { user } = this.state;
    return ( 
      <Fragment>
        <NavBar user={user} />
        <div className='app'>
          <Switch>
            <Route path='/logout' component={Logout} />
            <Route path='/register' component={Register} />
  
            <Route path='/login' component={Login} />
            <Route path='/cards' component={Cards} />
            <Route path='/home/card' component={CardItem}/>
            <Route path='/home' render={props => {
              if(user) {
                return <Home {...props} user={user} />
              }
              return <LandingPage {...props} />}
            }/>
            <Route path='/about' component={About} />
            <Route path='/profile/:id' render={props => {
              if(!user) {
                return <Redirect to='/login' />
              }
              return <CardForm {...props} user={user} /> 
            }}/>
            <Route path='/profile' render={props => <Profile {...props} user={user} />} />
            
            <Route path='/not-found' component={NotFound} />
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