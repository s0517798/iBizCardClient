import React, { Component } from 'react';
import CardUI from '../cards/cardUI';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { getCard, deleteCard } from '../../services/cardService';
import './profile.css';


class Profile extends Component {
  state = { 
    card: []
  }

  async componentDidMount() {
    const { data:card } = await getCard()
    this.setState({ card })
  }

  // Deleting a card
  handleDeleteCard = async card => {
    const initialCard = this.state.cards;
    const cards = initialCard.filter(c => c._id !== card._id)
    this.setState({ cards })
    
    try {
      await deleteCard(card._id)
    } catch(ex) {
      if(ex) {
        console.log(ex);
      }
      this.setState({ initialCard })
    }
  }
  
  render() { 
    const { user } = this.props
    const { card } = this.state
    return ( 
      <main id='profile'>
      <div>
        <Row>
          <Col xs="12" sm="12" md="12">
            <CardUI 
              user={user} 
              card={card} 
              deleteCard={this.handleDeleteCard}
            />
          </Col>
        </Row>
      </div>
      <div>
        { user && card.length > 0 ? null : 
          <div>
            <Link to='/profile/new'>
              <FontAwesomeIcon style={styles.addButton}  icon={faPlusCircle} />
            </Link>
          </div>
        }
      </div>
    </main>
    );
  }
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
