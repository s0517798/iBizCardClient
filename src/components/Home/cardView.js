import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faMapMarkerAlt, faGlobe  } from '@fortawesome/free-solid-svg-icons'
import './home.scss'
class CardView extends Component {
  state = {  }
  render() { 
    const { card } = this.props
    if(card === undefined) {
      return (
        <div>select a card</div>
      )
    } else {
      return (
        <div key={card._id} id='card-view'>
          <div className='card-view-card'>
            <div className='card-logo'>iBC</div>
            <div className='card-name-profession'>
              <div>
                <div className='card-name'>{card.name}</div>
                <div className='card-profession'>{card.profession}</div>
              </div>
            </div>
            <div className='card-adress infos'>
              <FontAwesomeIcon className='card-icons' style={{cursor: 'pointer'}} size="lg" icon={faMapMarkerAlt} />
              <div>
                <div className='card-info-details'>{card.address}</div>
                <div>united states 12345</div>
              </div>
            </div>
            <div className='card-phone infos'>
              <FontAwesomeIcon className='card-icons' style={{cursor: 'pointer'}} size="lg" icon={faPhone} />
              <div>{card.phone}</div>
            </div>
            <div className='card-email-website infos'>
              <FontAwesomeIcon className='card-icons' style={{cursor: 'pointer'}} size="lg" icon={faGlobe} />
              <div>
                <div className='card-info-details'>{card.email}</div>
                <div>{card.website}</div>
              </div>
            </div>
  
            <div className='card-qr-code-container'>
              <div className='card-qr-code'>qr code</div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default CardView;