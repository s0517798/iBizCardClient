import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import Authenticator from './authenticator';
import { Home, Route1 } from './Home/home';


let PrivateRoute = (props) => {

  const [loaded, setLoaded] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const authenticated = async () => {
    try{
      await Auth.currentAuthenticatedUser()
      setLoaded(true)
      setIsAuthenticated(true)
    }catch(ex) {
      props.history.push('/register')
    }
  }

  useEffect(() => {
    authenticated()
    let unlisten = props.history.listen(async () => {
      try{
        const user = await Auth.currentAuthenticatedUser()
        console.log('user:', user);
      }catch(ex) {
        if(isAuthenticated) {
          setIsAuthenticated(false)
        }
      }
    })
    return () => {
      unlisten()
    };
  }, []);

  const { component: Component, ...rest } = props

  if(!loaded) return null
  return ( 
    <Route 
    {...rest}
    render={props => {
      return isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect 
          to={{
            pathname: '/register'
          }}
        />
      )
    }}
  />
   );
}
 
PrivateRoute = withRouter(PrivateRoute)


const Routes = () => {
  return ( 
    <BrowserRouter>
      <Switch>
        <Route path='/register' component={Authenticator} />
        <PrivateRoute path='/route1' component={Route1} />
        <PrivateRoute path='/' component={Home} />
      </Switch>
    </BrowserRouter>
   );
}
 
export default Routes;