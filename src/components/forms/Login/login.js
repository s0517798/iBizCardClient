import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import { Auth } from 'aws-amplify';
import './login.scss'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    errors: ''
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;

    this.setState({ [name]: value })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { username, password } = this.state;
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
      this.setState({ errors: ex.message })
    }
  }

  loginState = () => {
    if(this.state.errors !== '') {
      return (
        <div className='failedLogin'>
          {this.state.errors}
        </div>
      )
    }
  }

  renderInput = (placeholder, name, value, ...rest) => {
    return (
      <div className="form-group">
        <input {...rest} placeholder={placeholder} type={name} name={name} value={value} onChange={this.handleInputChange} className="form-control"/>
      </div>
      
    )
  } 
  render() { 
    const { username, password, errors } = this.state
    return ( 
      <div id='login'>
        <div className='login-left'>
        </div>
        <div className='login-right'>
          <div className='login-right-form'>
            <h1 className='text-center m-4'>iBizCard</h1>
            <div>{this.loginState()}</div>
            <form onSubmit={this.handleSubmit}>
              {this.renderInput('Email or username', 'username', username)}
              {this.renderInput('Password', 'password', password)} 
              <div className='login-button'>
                <button disabled={ username === '' || password === '' ? true : false } type='submit' className="btn-submit">{errors ? 'Try again' : 'Login'}</button> 
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
