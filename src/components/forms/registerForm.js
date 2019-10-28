import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';


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


  const renderInput = (label, name, value, ...rest) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input name={name} value={value} onChange={handleInputChange} className="form-control"/>
      </div>
    )
  } 
 
  return ( 
    <div>

          <div>
            <div>
              <h2>Register Form</h2>
            </div>
            <form onSubmit={handleSubmit}>        
              {renderInput('Username', 'username', user.company)} 
              {renderInput('Password', 'password', user.password )}
              {renderInput('Email', 'email', user.email)} 
              <Link to='/'>
                <button type='button' className="btn btn-secondary mt-2 mb-2 mr-2">Cancel</button>
              </Link>
              <button type="submit" className="btn btn-success mt-2 mb-2">Register</button>
            </form>
          </div>
        
     
          <div>
            {renderInput('Auth Code', 'authCode', user.authCode)}
            <button className="btn btn-success mt-2 mb-2" onClick={confirmRegister}>Confirm Sign Up</button>
          </div>
      
      </div>
   );
}
 
export default RegisterForm;
