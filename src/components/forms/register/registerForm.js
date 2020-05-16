import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserFriends, faPlug, faShare  } from '@fortawesome/free-solid-svg-icons';
import { register } from '../../../firebase/userService';
import './register.scss'

class RegisterForm extends Component {
  state = { 
    data: {
      // displayName: '',
      email: '',
      password: '',
      // phone: null,
      // photoURL: null
    },
    errors: '',
    message: ''
    // authCode: '',
    // showConfirmation: false
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    const data = {...this.state.data}
    data[name] = value
    this.setState({ data })
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await register(this.state.data)
      this.setState({ errors: 'Registered! You may now log in.'})
    } catch (ex) {
      this.setState({ errors: ex.message })
    }
  }

  registerState = () => {
    const { errors } = this.state
    if(errors !== '') {
      return (
        <div className='failedRegister'>
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

  confirmRegister = async (e) => {
    e.preventDefault()
    try{
    
    }catch(ex) {
      
    }
    
  }

  render() {
    const { data, message } = this.state
    return ( 
      <div id='register'>
        <div className='register-left'>
        </div>
        <div className='register-right'>
          <div className='register-right-form'>
            <h1 className='text-center m-4'>iBizCard</h1>
            <form onSubmit={this.handleSubmit}>
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
              <div>{this.registerState()}</div>
              <div>{message}</div>
              {/* {renderInput('Username', 'username', user.company)}  */}
              {this.renderInput('Email', 'email')} 
              {this.renderInput('Password', 'password')}
              <div className='register-button'>
                <button disabled={data.email === '' || data.password === '' || data.email === '' ? true : false} type="submit" className="btn-submit">Register</button>
              </div>
            </form>
              {/* <div>{verificationMsg}</div>
              <p className='account'>Do you have an account? <Link className='login-link' to='/login'>Log in</Link></p>
              {renderInput('Verification Code', 'authCode', user.authCode)}
              <button disabled={user.authCode === ''} className="btn-submit btn-sm btn-block mb-3" onClick={confirmRegister}>Verified</button> */}
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterForm;
