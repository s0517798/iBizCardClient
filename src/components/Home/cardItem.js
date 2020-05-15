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
            to={`/${card._id}`}
            onClick={() => this.props.selectCardFn(index)} 
            key={card._id} 
            className="card-item"
            selected={this.props.selectedCardIndex === index}
          >
            {/* <div className="card-item-details"> */}
              <div className="card-avatar">
                <Avatar size="80" color="red" round name={card.name} />
              </div>
              <div className="card-user">
                <div className='card-item-details'>
                <div>{card.company}</div>
                <div>{card.name}</div>
                <div>{card.profession}</div>
                </div>
                <FontAwesomeIcon onClick={this.props.onFavorite} className='save-card' icon={emptyStar} />
              </div>
            {/* </div> */}
          </Link>
        ))}
      </div>
    );
  }
}

export default CardItem;