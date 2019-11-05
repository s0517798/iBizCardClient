import React, { useState, useEffect } from 'react';
import CardUI from './cards/cardUI';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

import { apiUrl } from './services/config.json';
import axios from 'axios';

const endPoint = apiUrl + '/cards';

const Profile = ({user}) => {
  const [card, setCard] = useState([]);

  useEffect(() => {
    let mounted = true
    // function to get data from endpoint
    const cardData = async () => {
      try {
        // Reading a card
        const acard = await axios.get(endPoint)

        if(mounted) {
          setCard(acard.data)
        }
      } catch(ex) {
        console.log(ex)
      }
    }
    cardData()

    return () => {
      console.log('Unmounted the cards')
      mounted = false
    }
  }, [])


  // Deleting a card
  const deleteCard = async (acard) => {
    
    const initialCard = card;
    let accessToken = localStorage.getItem('accesstoken')
    try {
      const aCard = await card.filter(c => c._id !== acard._id)
      setCard(aCard)
      await axios.delete(`${endPoint}/${acard._id}`, {
        headers: {
          'accesstoken': accessToken,
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
        }
      })
    } catch(ex) {
      if(ex) {
        console.log(ex);
      }
      setCard(initialCard)
    }
  }


  return ( 
    <div>
      <Row>
        <Col xs="12" sm="12" md="12">
          <CardUI user={user} card={card} deleteCard={deleteCard}/>
        </Col>
      </Row>
      <div>
        { card.length > 0 ? null : 
          <div>
            <div>
              <h4>THERE ARE NO CARDS</h4>
            </div>
            <div>
              <Link to='/profile/new'>
                <FontAwesomeIcon style={styles.addButton}  icon={faPlusCircle} />
              </Link>
            </div>
          </div>
        }
      </div>
    </div>
   );
}
 
export default Profile;


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