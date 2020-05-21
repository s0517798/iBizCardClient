import React, { Component } from 'react';
import Avatar from 'react-avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as fullStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons'

import { Link } from 'react-router-dom';

class CardItem extends Component {

  render() { 
    return ( 
      <div>
        {this.props.cards.map((card, index) => (
          <Link
            to={`/cards/${card.id}`}
            onClick={() => this.props.selectCardFn(index)} 
            key={card.id} 
            className="card-item"
            selected={this.props.selectedCardIndex === index}
          >
            {/* <div className="card-item-details"> */}
              <div className="card-avatar">
                <Avatar size="80" color="red" round src={this.props.onPhotoUrl} />
              </div>
              <div className="card-user">
                <div className='card-item-details'>
                <div>{card.data.company}</div>
                <div>{card.data.fullName}</div>
                <div>{card.data.profession}</div>
                </div>
                {/* <FontAwesomeIcon onClick={this.props.onFavorite} className='save-card' icon={emptyStar} /> */}
              </div>
            {/* </div> */}
          </Link>
        ))}
      </div>
    );
  }
}

export default CardItem;