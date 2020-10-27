import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { login } from '../../../firebase/authService';
import './login.css'

class LoginForm extends Component {
  state = {
    data: {
      email: '',
      password: ''
    },
    errors: ''
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    const data = {...this.state.data}
    data[name] = value
    this.setState({ data })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    try{
      await login(this.state.data)
      window.location = '/'
    }catch(ex) {
      this.setState({ errors: ex.message })
    }
  }

  loginState = () => {
    const { errors } = this.state
    if(errors !== '') {
      return (
        <div className='failedLogin'>
          {errors}
        </div>
      )
    }
  }

  renderInput = (placeholder, name, ...rest) => {
    const { data } = this.state
    return (
      <div className="form-group">
        <input {...rest} placeholder={placeholder} type={name} name={name} value={data[name]} onChange={this.handleInputChange} className="form-control"/>
      </div>
    )
  } 
  render() { 
    const { data, errors } = this.state
    return ( 
      <div id='login'>
        <div className='login-left'>
        </div>
        <div className='login-right'>
          <div className='login-right-form'>
            <h1 className='text-center m-4'>iBizCard</h1>
            <div>{this.loginState()}</div>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput('Email or username', 'email')}
              {this.renderInput('Password', 'password')} 
              <div className='login-button'>
                <button disabled={ data.email === '' || data.password === '' ? true : false } type='submit' className="btn-submit">{errors ? 'Try again' : 'Login'}</button> 
              </div>
            </form>
            <p className='account'>Do you not have an account? <Link className='register-link' to='/register'>Register</Link></p>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
