import React, { Component } from 'react';
import { getCard } from '../../firebase/cardService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt, faGlobe } from '@fortawesome/free-solid-svg-icons';
import ShareCardModal from './shareCardModal';
import { Link, Redirect } from 'react-router-dom';
import './cards.css'


class CardView extends Component {
  state = {
    card: {}
  }
  async populateCards() {
    try {
      const cardId = this.props.match.params.cardId
      if(!cardId) return
      
      let card = await getCard(cardId)
      card = {id: card.id, ...card.data() }

      this.setState({ card: this.mapToViewModel(card)})
      
    } catch(ex) {
      if(ex.response && ex.response.status === 404) {
        this.props.history.replace('/not-found')
      }
    }
  }
  async componentDidMount() {
    await this.populateCards()
  }

  mapToViewModel(card) {
    return {
      // logo: card.logo,
      id: card.id,
      username: card.username,
      company: card.company,
      slogan: card.slogan,
      fullName: card.fullName,
      profession: card.profession,
      phone: card.phone,
      email: card.email,
      address1: card.address1,
      address2: card.address2,
      website: card.website,
  }
  }
 
  render() { 
    const { card } = this.state

    return (
      <div id='card-view'>
            <div key={card.id} >
              <h1>{card.company}</h1>
              <div className='card-view-card'>
                <div className='card-logo'>logo</div>
                <div className='card-logo'>{card.company}</div>
                <div className='card-logo'>{card.slogan}</div>
                <div className='card-name-profession'>
                  <div>
                    <div className='card-name'>
                      <a
                        target='blank'
                        href={
                          'http://www.google.com/search?q=' + card.fullName
                        }>
                        {card.fullName}
                      </a>
                    </div>
                    <div className='card-profession'>
                      {card.profession}
                    </div>
                  </div>
                </div>
                <div className='card-adress infos'>
                  <FontAwesomeIcon
                    className='card-icons'
                    style={{ cursor: 'pointer' }}
                    size='lg'
                    icon={faMapMarkerAlt}
                  />
                  <div>
                    <div className='card-info-details'>
                      {card.address1}
                    </div>
                    <div>{card.address2}</div>
                  </div>
                </div>
                <div className='card-phone infos'>
                  <FontAwesomeIcon
                    className='card-icons'
                    style={{ cursor: 'pointer' }}
                    size='lg'
                    icon={faPhone}
                  />
                  <div>
                    <a href={`tel: ${card.phone}`}>{card.phone}</a>
                  </div>
                </div>
                <div className='card-email-website infos'>
                  <FontAwesomeIcon
                    className='card-icons'
                    style={{ cursor: 'pointer' }}
                    size='lg'
                    icon={faGlobe}
                  />
                  <div>
                    <div className='card-info-details'>
                      <a href={`mailto: + ${card.email}`}>
                        {card.email}
                      </a>
                    </div>
                    <div>
                      <a target='blank' href={`http://${card.website}`}>
                        {card.website}
                      </a>
                    </div>
                  </div>
                </div>
                <div className='card-qr-code-container'>
                  <ShareCardModal />
                  
                </div>
                <Link to={`/profile/${card.id}`}>edit</Link>
              </div>
            </div>
      </div>
    
    );
  }
}
 
export default CardView;