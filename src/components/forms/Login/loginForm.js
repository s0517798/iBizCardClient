import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { Auth } from 'aws-amplify';

import './loginForm.css'

const LoginForm = (props) => {

  
  const initialFormState = {
      username: '',
      password: ''
  }
  
  const [user, setUser] = useState(initialFormState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user,  [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { username, password } = user;
    try{
      const aUser = await Auth.signIn({
        username, 
        password,
      })
      console.log(aUser);
      const accessToken = aUser.signInUserSession.accessToken.jwtToken
      localStorage.setItem('accesstoken', accessToken)
      console.log('User logged in...');
      window.location = '/home'
    }catch(ex) {
      console.log('error signed in', ex);
    }
  }

  const renderInput = (placeholder, name, value, ...rest) => {
    return (
      <div className="form-group">
        <input {...rest} placeholder={placeholder} name={name} value={value} onChange={handleInputChange} className="form-control"/>
      </div>
      
    )
  } 
  
  return ( 
    <section id='login-form'>
      <div className='container'>
        <div>
          <h2 className='text-center m-4'>iBizCard</h2>
        </div>
        
          <form onSubmit={handleSubmit}>
            {renderInput('Email or username', 'username', user.username)} 
            {renderInput('Password', 'password', user.password)} 
            {/* <Link to='/'>
              <button type='button' className="btn btn-secondary mt-2 mb-2 mr-2">Cancel</button>
            </Link> */}
            <button type='submit' className="btn btn-primary btn-sm btn-block mb-3">Login</button>
          </form>
        <div>
          <p className='text-center'>Do you not have an account? <Link to='/register'>Register</Link></p>
        </div>
      </div>
    </section>
   );
}
 
export default LoginForm;
