import React from 'react';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import './cards.css'

const CardItem = ({ cards, onDelete }) => {
  return (
    <div id='cardItem'>
      {cards.map((card) => (
        <div className='cardItem-container' key={card.id}>
          <Link to={`/cards/${card.id}`}  className='card-item'>
            <div className='card-avatar'>
              <Avatar size='80' color='red' round name={card.fullName} />
            </div>
            <div className='card-user'>
              <div className='card-item-details'>
                <div>{card.company}</div>
                <div>{card.fullName}</div>
                <div>{card.profession}</div>
              </div>
            </div>
          </Link>
          <button onClick={() => onDelete(card.id)} className='card-qr-code'>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default CardItem;
