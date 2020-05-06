import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faMapMarkerAlt, faGlobe  } from '@fortawesome/free-solid-svg-icons'
import './home.scss'
class CardView extends Component {
  state = {  }
  render() { 
    return ( 
      <div id='card-view'>
        <div className='card-view-card'>
          <div className='card-logo'>iBC</div>
          <div className='card-name-profession'>
            <div>
              <div className='card-name'>Withman Simprevil</div>
              <div className='card-profession'>Software Developer</div>
            </div>
            
          </div>
          <div className='card-adress infos'>
            <FontAwesomeIcon className='card-icons' style={{cursor: 'pointer'}} size="lg" icon={faMapMarkerAlt} />
            <div>
              <div>South Florida</div>
              <div>united states 12345</div>
            </div>
          </div>
          <div className='card-phone infos'>
            <FontAwesomeIcon className='card-icons' style={{cursor: 'pointer'}} size="lg" icon={faPhone} />
            <div>954-999-9999</div>
          </div>
          <div className='card-email-website infos'>
            <FontAwesomeIcon className='card-icons' style={{cursor: 'pointer'}} size="lg" icon={faGlobe} />
            <div>
              <div>withman.simprevil@gmail.com</div>
              <div>wwww.iWithman.com</div>
            </div>
          </div>

          <div className='card-qr-code-container'>
            <div className='card-qr-shape'></div>
            <div className='card-qr-code'>qr code</div>
          </div>
        </div>
      </div>
    );
  }
}

export default CardView;