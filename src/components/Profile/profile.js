import React, { Component } from 'react';
import CardUI from '../cards/cardUI';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'
import { getCards, deleteCard } from '../../services/cardService';
import './profile.scss';
import Avatar from 'react-avatar';


class Profile extends Component {
  state = { 
    cards: []
  }

  async componentDidMount() {
    const { data:cards} = await getCards()
    this.setState({ cards })
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
    const { cards } = this.state
    return ( 
      <div id='profile'>
        <h1>Profile</h1>
        <hr />
        <div className='profile-body'>
          <div className='profile-left'>
            <Row className='profile-card'>
              <Col className='profile-avatar'>
                <Avatar size="150" color="red" round />
              </Col>
              <Col className='profile-contact'>
                <div>name</div>
                <div>email</div>
                <div>phone</div>
              </Col>
            </Row>
          </div>
          <div className='profile-right'>my Card info</div>
        </div>
        {/* <div>
          <Row>
            <Col xs="12" sm="12" md="12">
              <CardUI 
                user={user} 
                card={cards} 
                onDeleteCard={this.handleDeleteCard}
              />
            </Col>
            <Col>
            </Col>
          </Row>
        </div>
      <div>
        { user && cards.length > 0 ? null : 
          <div>
            <Link to='/profile/new'>
              <FontAwesomeIcon style={styles.addButton}  icon={faPlusCircle} />
            </Link>
          </div>
        }
      </div> */}
    </div>
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
