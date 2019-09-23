import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const endPoint = ""

const SignUpForm = props => {

  
  const initialFormState = {
    email: '',
    password: ''
  }
  
  
  const [user, setUser] = useState(initialFormState);


  const handleInputChange = e => {
    const { name, value } = e.target;

    setUser({  [name]: value })
  }


  const addUser = (user) => {
    axios.post(endPoint, user)
    setUser(user)
  }

  const handleSubmit = e => {
      e.preventDefault()
      addUser(user)
      setUser(initialFormState)
      props.history.push('/')
  }

  const renderInput = (label, name, value) => {
    return (
      <div>
        <label className="mt-3">{label}</label>
        <input type='text' className="form-control" name={name} value={value} onChange={handleInputChange} />
      </div>
      
    )
  } 
  
  
  return ( 
    <div>
      <div>
        <h2>Sign Up Form</h2>
      </div>
      <form
        onSubmit={handleSubmit}
      >
        
        {renderInput('Email', 'email', user.email)} 
        {renderInput('Password', 'password', user.password)} 
        
        
        <Link to='/'>
          <button type='button' className="btn btn-secondary mt-2 mb-2 mr-2">Cancel</button>
        </Link>
        <button className="btn btn-primary mt-2 mb-2">Sign Up</button>
      </form>
      
      </div>
   );
}
 
export default SignUpForm;
