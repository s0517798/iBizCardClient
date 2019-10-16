import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import { apiUrl } from '.././components/services/config.json';
import axios from 'axios';
import '../App.css';
import CardUI from './cards/cardUI';

const endPoint = apiUrl + '/cards';

const Cards = () => {
  const [cards, setCards] = useState([]);
  
  
  useEffect(() => {
    let mounted = true
    // function to get data from endpoint
    const cardsData = async () => {
      try {
        // Reading a card
        const card = await axios.get(endPoint)
        if(mounted) {
          setCards(card.data)
        }
      } catch(ex) {
        console.log(ex)
      }
    }
    cardsData()

    return () => {
      console.log('Unmounted the cards')
      mounted = false
    }
  }, [])


  // Deleting a card
  const deleteCard = async card => {
    
    const initialCard = cards;
    const aCard = initialCard.filter(c => c._id !== card._id)
    setCards(aCard)
    
    try {
      await axios.delete(`${endPoint}/${card._id}`)
    } catch(ex) {
      if(ex) {
        console.log(ex);
      }
      setCards(initialCard)
    }
  }

console.log(cards);
  return (
    <div>
      <Row>
        <Col xs="12" sm="12" md="12">
          <CardUI cards={cards} deleteCard={deleteCard}/>
        </Col>
      </Row>
      <div>
        { cards.length > 0 ? null : 
          <Link to='/cards/new'>
          <FontAwesomeIcon style={styles.addButton}  icon={faPlusCircle} />
        </Link>
        }
      </div>
    </div>
  );
}

export default Cards;

const styles = {
  addButton: {
    color: 'red',
    margin: 0,
    top: 'auto',
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  }

}