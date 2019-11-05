import React from 'react';
import LoginForm from '../forms/Login/loginForm';

import './landingPage.css';

const LandingPage = () => {
  return ( 
    <main id='landing-page'>
      <div className='container'>
        <div className='row'>
          <div className='col-md landing-left'>
            {/* <h3>left</h3> */}
          </div>
          <div className='col landing-right'>
            <LoginForm />
          </div>

        </div>
      </div>
    </main>
   );
}
 
export default LandingPage;