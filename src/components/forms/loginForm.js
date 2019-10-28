import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

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
      const token = aUser.signInUserSession.idToken.jwtToken
      localStorage.setItem('token', token)
      // localStorage.setItem('token', token)
      console.log('User logged in...');
      window.location = '/home'
    }catch(ex) {
      console.log('error signed in', ex);
    }
  }

  const renderInput = (label, name, value, ...rest) => {
    return (
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input {...rest} name={name} value={value} onChange={handleInputChange} className="form-control"/>
      </div>
      
    )
  } 
  
  return ( 
    <div>
      <div>
        <h2>Login Form</h2>
      </div>
      <form onSubmit={handleSubmit}>
        {renderInput('Username', 'username', user.username)} 
        {renderInput('Password', 'password', user.password)} 
        <Link to='/'>
          <button type='button' className="btn btn-secondary mt-2 mb-2 mr-2">Cancel</button>
        </Link>
        <button type='submit' className="btn btn-success mt-2 mb-2">Login</button>
      </form>
    </div>
   );
}
 
export default LoginForm;
