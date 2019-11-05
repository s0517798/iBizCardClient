import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import RegisterForm from './forms/register/registerForm';
import LoginForm from './forms/Login/loginForm';

const Authenticator = () => {

  const initialState = {
    previewSignIn: true
  }

  const [showLogin, setShowLogin] = useState(initialState)

  return ( 
    <div>
      {
        showLogin ? (
          <div>
            <LoginForm />
            <button className="btn btn-info btn-sm"  onClick={() => setShowLogin(false)}>Sign up</button>
          </div>
        ) : (
          <div>
            <RegisterForm />
            <button className="btn btn-info btn-sm" onClick={() => setShowLogin(true)}>Sign in</button>
          </div>
          
        )
      }
      
    </div>
   );
}
 
export default withRouter(Authenticator);