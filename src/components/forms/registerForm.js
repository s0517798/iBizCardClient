import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SignUp } from '../services/userServices';


const RegisterFrom = () => {

  
  const initialFormState = {
    data: {
      email: '',
      password: ''
    }
  }
  
  
  const [user, setUser] = useState(initialFormState.data);


  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setUser({ ...user, [name]: value })
  }


  
  

  const handleSubmit = async() => {
    return await SignUp(user)
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
        <h2>Register Form</h2>
      </div>
      <form
        onSubmit={handleSubmit}
      >
        
        {renderInput('Email', 'email', user.name)} 
        {renderInput('Password', 'password', user.password)} 
        
        
        <Link to='/'>
          <button type='button' className="btn btn-secondary mt-2 mb-2 mr-2">Cancel</button>
        </Link>
        <button type="submit" className="btn btn-primary mt-2 mb-2">Register</button>
      </form>
      
      </div>
   );
}
 
export default RegisterFrom;
