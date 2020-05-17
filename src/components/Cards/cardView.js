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
          <h1>{card.data.company}</h1>
          <div className='card-view-card'>
            <div className='card-logo'>logo</div>
            <div className='card-logo'>{card.data.company}</div>
            <div className='card-logo'>{card.data.slogan}</div>
            <div className='card-name-profession'>
              <div>
                <div className='card-name'>
                  <a target="blank" href={"http://www.google.com/search?q=" + card.data.fullName }>{card.data.fullName}</a>
                </div>
                <div className='card-profession'>{card.data.profession}</div>
              </div>
            </div>
            <div className='card-adress infos'>
              <FontAwesomeIcon className='card-icons' style={{cursor: 'pointer'}} size="lg" icon={faMapMarkerAlt} />
              <div>
                <div className='card-info-details'>{card.data.address1}</div>
                <div>{card.data.address2}</div>
              </div>
            </div>
            <div className='card-phone infos'>
              <FontAwesomeIcon className='card-icons' style={{cursor: 'pointer'}} size="lg" icon={faPhone} />
              <div>
                <a href={`tel: ${card.data.phone}`}>{card.data.phone}</a>
              </div>
            </div>
            <div className='card-email-website infos'>
              <FontAwesomeIcon className='card-icons' style={{cursor: 'pointer'}} size="lg" icon={faGlobe} />
              <div>
                <div className='card-info-details'>
                <a href={`mailto: + ${card.data.email}`}>{card.data.email}</a>
                </div>
                <div>
                <a target="blank" href={`http://${card.data.website}`}>{card.data.website}</a>
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