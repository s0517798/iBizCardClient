import React, { Fragment } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faPlug, faShare  } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom';
import Login from '../forms/Login/login';


import './landingPage.css';

const LandingPage = () => {
  return ( 
    <div id='landing-page'>
      
      <main className='body-content'>
        <section className='body-content-img'>
          <div className=''>
            <div className='welcome-msg'>A digital business cards <br />social collaboration</div>
            <div></div>
          </div>
        </section>
        <section>

        </section>
      </main>
    </div>
   );
}
 
export default LandingPage;