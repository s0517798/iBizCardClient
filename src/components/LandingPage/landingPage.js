import React from 'react';
import LoginForm from '../forms/Login/loginForm';

import './landingPage.css';

const LandingPage = () => {
  return ( 
    <main id='landing-page'>
      
        <div className='row'>
          <div className='col-md landing-left'>
            
            <div>
              Connect with other iBizCard owners in your area.
            </div>
            <div>Share your card electronically.</div>
            <div>Direct contact through the card, one touch away.</div>
            
          </div>
          
          <div className='col-md landing-right'>
            <LoginForm />
          </div>

        </div>
    </main>
   );
}
 
export default LandingPage;