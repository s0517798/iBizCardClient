import React from 'react';
import Authenticator from '../authenticator';
import './landingPage.css';

const LandingPage = () => {
  return ( 
    <section id='container landing-page'>
      <div>
        <div className='row'>
        <div className='col landing-left'>
          <h1>LEFT SIDE</h1>
        </div>
        <div className='col landing-right'>
          <Authenticator />
        </div>

        </div>
      </div>
    </section>
   );
}
 
export default LandingPage;