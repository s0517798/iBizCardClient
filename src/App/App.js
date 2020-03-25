import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
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
import Footer from '../components/Footer/footer';
import './App.css';
import About from '../components/about/about';

const endPoint = 'http://localhost:3001/api' + '/cards';

const App = () => {

  const [cards, setCards] = useState([]);

  const [user, setUser] = useState()

  //   useEffect(() => {
//     let mounted = true
//     // function to get data from endpoint
//     const cardsData = async () => {
//       try {
//         // Reading a card
//         const card = await axios.get(endPoint)
//         if(mounted) {
//           setCards(card.data)
//         }
//       } catch(ex) {
//         console.log(ex)
//       }
//     }
//     cardsData()

//     return () => {
//       console.log('Unmounted the cards')
//       mounted = false
//     }
//   }, [])

  useEffect(() => {
    const getData = async() => {
      try{
        const card = await axios.get(endPoint)
        // get the token
        const jwt = localStorage.getItem('accesstoken')
        // get us the current user object
        const currentUser = jwtDecode(jwt)
        setUser(currentUser)
      } catch(ex) {}

    }
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
      <Route render={props => <NavBar {...props} user={user}/>} /> 
      <div id='app'>
        <Switch>
          <Route path='/home' render={props => <Home {...props} user={user} />} />
          <Route path='/about' render={props => <About {...props} user={user} />} />
          <Route path='/accounts/register' render={props => {
            if(!user) {
              return <Register {...props} /> 
            }
            return <Redirect to='/' />
          }}/>

          <Route path='/accounts/login' render={props => {
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
          
          <Route path='/profile/new' render={props => {
            if(!user) {
              return <Redirect to='/' />
            }
            return <AddCardForm {...props} /> 
          }}/>

          <Route path='/logout' component={Logout} />
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
 
export default App;