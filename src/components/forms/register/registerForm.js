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
        <input {...rest} placeholder={placeholder} type={name} name={name} value={value} onChange={handleInputChange} className="form-control"/>
      </div>
    )
  } 
 
  return ( 
    <section id='register-form'>
      <div className='form'>
        <div className='container'>
          <div>
            <h1 className='text-center m-4'>iBizCard</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <h5>Register to see other iBizCard owners around you.</h5> 
            {renderInput('Username', 'username', user.company)} 
            {renderInput('Password', 'password', user.password )}
            {renderInput('Email', 'email', user.email)} 
            <button type="submit" className="btn-submit btn-sm btn-block mb-3">Register</button>
          </form>
          <div>
            <p className='account'>Do you have an account? <Link className='link' to='/accounts/login'>Log in</Link></p>
          </div>
          <div>
            {renderInput('Auth Code', 'authCode', user.authCode)}
            <button className="btn-submit btn-sm btn-block mb-3" onClick={confirmRegister}>Confirm Sign Up</button>
          </div>
        </div>
      </div>
    </section>
   );
}
 
export default RegisterForm;
