import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserFriends, faPlug, faShare  } from '@fortawesome/free-solid-svg-icons'
import Login from '../forms/Login/login';

import './landingPage.css';

const LandingPage = () => {
  return ( 
    <main id='landing-page'>
      <div className='landing'>
        <div className='row'>
          <div className='col-md-12 col-lg-6 landing-left'>
            
            <div className='connect'>
              <div>
                <p>
                <FontAwesomeIcon className="mr-2" size="lg" icon={faPlug} />
                  Connect with other iBizCard owners in your area.</p>
              </div>
              <div>
                <p>
                <FontAwesomeIcon className="mr-2" size="lg" icon={faShare} />
                  Share your card electronically.</p>
              </div>
              <div>
                <p>
                <FontAwesomeIcon className="mr-2" size="lg" icon={faUserFriends} />
                  Direct contact through the card, one touch away.</p>
              </div>
            </div>
            
          </div>
          
          <div className='col-md-12 col-lg-6 landing-right'>
            <Login />
          </div>
        </div>
      </div>
    </main>
   );
}
 
export default LandingPage;