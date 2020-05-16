import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faMapMarkerAlt, faGlobe,faShareAlt  } from '@fortawesome/free-solid-svg-icons'
import './cards.scss'
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
          <h1>{card.company}</h1>
          <div className='card-view-card'>
            <div className='card-logo'>logo</div>
            <div className='card-name-profession'>
              <div>
                <div className='card-name'>
                  <a target="blank" href={"http://www.google.com/search?q=" + card.name }>{card.name}</a>
                </div>
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
              <div>
                <a href={`tel: + ${card.phone}`}>{card.phone}</a>
              </div>
            </div>
            <div className='card-email-website infos'>
              <FontAwesomeIcon className='card-icons' style={{cursor: 'pointer'}} size="lg" icon={faGlobe} />
              <div>
                <div className='card-info-details'>
                <a href={`mailto: + ${card.email}`}>{card.email}</a>
                </div>
                <div>
                <a target="blank" href={`http://${card.website}`}>{card.website}</a>
                </div>
              </div>
            </div>
  
            <div className='card-qr-code-container'>
              <FontAwesomeIcon onClick={this.props.onShare} style={{cursor: 'pointer'}} size="lg" icon={faShareAlt} />
              <div className='card-qr-code'>qr code</div>
            </div>
          </div>
        </div>
      )
    }
  }
}

export default CardView;