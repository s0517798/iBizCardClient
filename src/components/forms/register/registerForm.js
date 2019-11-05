import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

import './registerForm.css'

const RegisterForm = () => {
  
  const initialFormState = {
    username: '',
    password: '',
    email: '',
    phone_number: '',
    authCode: '',
    showConfirmation: false
  }
  
  
  const [user, setUser] = useState(initialFormState);

  const register = async () => {
    const { username, password, email, phone_number } = user;
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          phone_number
        }
      })
      console.log('Signed Up...')
    }catch(ex) {
      console.log('Error occured while signing up: ', ex);
    }
  }


  

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value })
  }
  
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    await register()
  }


  const confirmRegister = async (e) => {
    e.preventDefault()
    try{
      await Auth.confirmSignUp(user.username, user.authCode)
      console.log('successful sign up');
      window.location = '/';      
    }catch(ex) {
      console.log(ex);
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
    <section id='register-form'>
      <div className='container'>
        <div>
          <h2 className='text-center m-4'>Register Form</h2>
        </div>
        <form onSubmit={handleSubmit}>        
          {renderInput('Username', 'username', user.company)} 
          {renderInput('Password', 'password', user.password )}
          {renderInput('Email', 'email', user.email)} 
          <button type="submit" className="btn btn-primary btn-sm btn-block mb-3">Register</button>
        </form>
        <div>
          <p className='text-center'>Do you have an account? <Link to='/'>Log in</Link></p>
        </div>
        <div>
          {renderInput('Auth Code', 'authCode', user.authCode)}
          <button className="btn btn-primary btn-sm btn-block mb-3" onClick={confirmRegister}>Confirm Sign Up</button>
        </div>
      </div>
    </section>
   );
}
 
export default RegisterForm;
