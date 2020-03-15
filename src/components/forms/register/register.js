import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faPlug, faShare  } from '@fortawesome/free-solid-svg-icons';

import './register.scss'

const Register = () => {
  
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
    alert('A verification code has been sent to your email.')
  }


  const confirmRegister = async (e) => {
    e.preventDefault()
    try{
      await Auth.confirmSignUp(user.username, user.authCode)
      console.log('successful sign up');
      window.location = '/';
      alert('Confirmed!')     
    }catch(ex) {
      console.log(ex);
    }
    
  }

  const renderInput = (placeholder, name, value, ...rest) => {
    return (
      <div className="form-group">
        <input autoFocus {...rest} placeholder={placeholder} type={name} name={name} value={value} onChange={handleInputChange} className="form-control"/>
      </div>
    )
  } 

  
 
  return ( 
    <div id='register'>
      <div className='register-left'>
        
      </div>
      <div className='register-right'>
        <div className='register-right-form'>
          <h1 className='text-center m-4'>iBizCard</h1>
          <form onSubmit={handleSubmit}>
            <div className='connect'>
              <div>
                <p>
                <FontAwesomeIcon className="faPlug" size="lg" icon={faPlug} />
                  Connect with other iBizCard owners in your area.</p>
              </div>
              <div>
                <p>
                <FontAwesomeIcon className="faShare" size="lg" icon={faShare} />
                  Share your card electronically.</p>
              </div>
              <div>
                <p>
                <FontAwesomeIcon className="faUserFriends" size="lg" icon={faUserFriends} />
                  Direct contact through the card, one touch away.</p>
              </div>
            </div>
            {renderInput('Username', 'username', user.company)} 
            {renderInput('Password', 'password', user.password )}
            {renderInput('Email', 'email', user.email)} 
            <div className='register-button'>
              <button disabled={user.username === '' || user.password === '' || user.email === '' ? true : false} type="submit" className="btn-submit">Register</button>
            </div>
          </form>
            <p className='account'>Do you have an account? <Link className='login-link' to='/accounts/login'>Log in</Link></p>
            {renderInput('Verification Code', 'authCode', user.authCode)}
            <button disabled={user.authCode === ''} className="btn-submit btn-sm btn-block mb-3" onClick={confirmRegister}>Verified</button>
        </div>
      </div>
    </div>
   );
}
 
export default Register;
