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
import CardView from '../components/Cards/cardView';
// import { getCards } from '../firebase/cardService';
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

        try {
          const { displayName, email } = user
          const photoUrl = await storage.ref(`users/${user.uid}/WS.jpg`)
          .getDownloadURL()
          this.setState({ photoUrl, user, displayName, email })

           
        } catch (ex) {
          const message = ex.message
          this.setState({ message })
        }
      } else {
        this.setState({ data: []})
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
            <Route path='/profile/:cardId' render={props => {
              if(!user) {
                return <Redirect to='/login' />
              }
              return <CardForm {...props} user={user} /> 
            }}/>
            <Route path='/profile' render={props => <Profile {...props} user={user} photoUrl={photoUrl} displayName={displayName} email={email} />} />
            
            <Route path='/not-found' component={NotFound} />
            {/* <Route path='/cards/:id' render={props => <Cards {...props} />} /> */}
            <Route exact path='/cards' render={ props => <Cards user={user} {...props} /> } />
            <Route exact path='/cards/:cardId' render={ props => <CardView {...props} /> } />
            <Route exact path='/' render={props => { 
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