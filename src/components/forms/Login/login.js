import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { Auth } from 'aws-amplify';
import Joi from 'joi'

import './login.scss'


const LoginForm = (props) => {

  
  const initialFormState = {
      username: '',
      password: ''
  }
  
  const [user, setUser] = useState(initialFormState);
  const [errors, setErrors] = useState('')

  const schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password')
  }

  // const validate = () => {
  //   const { error } = Joi.validate(user, schema, { abortEarly:  false })
   
  //   if(!error) {
  //     return null
  //   }
    
  //   const errors = {}
  //   for(let item of error.details) {
  //     errors[item.path[0]] = item.message
  //   }
  //   return errors
  // }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user,  [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // const errors = validate()
    // setErrors( errors || {} )
    // if(errors) {
    //   return
    // }

    const { username, password } = user;
    try{
      const aUser = await Auth.signIn({
        username, 
        password,
      })
      const accessToken = aUser.signInUserSession.accessToken.jwtToken
      // in case of refreshing comes to mind, I can possilby try and use this no so sure yet
      // const accessToken = aUser.signInUserSession.refreshToken.token
      localStorage.setItem('accesstoken', accessToken)
      console.log('User logged in...');
      window.location = '/home'
    }catch(ex) {
      console.log(ex.message);
      setErrors(ex.message)
    }
  }

  const loginState = () => {
    if(errors !== '') {
      return (
        <div className='failedLogin'>
          {errors}
        </div>
      )
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
    <div id='login'>
      <div className='login-left'>

      </div>
      <div className='login-right'>
        <div className='login-right-form'>
          <h1 className='text-center m-4'>iBizCard</h1>
          <div>{loginState()}</div>
          <form onSubmit={handleSubmit}>
            {renderInput('Email or username', 'username', user.username)}
            {renderInput('Password', 'password', user.password)} 
            <div className='login-button'>
              <button disabled={ user.username === '' || user.password === '' ? true : false } type='submit' className="btn-submit">{errors ? 'Try again' : 'Login'}</button> 
            </div>
          </form>
          <p className='account'>Do you not have an account? <Link className='register-link' to='/accounts/register'>Register</Link></p>
        </div>
      </div>
    </div>
   );
}
 
export default LoginForm;
