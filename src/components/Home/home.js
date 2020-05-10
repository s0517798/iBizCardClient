import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import auth from '../../services/authService';
import { getCards, deleteCard } from '../../services/cardService';
import CardItem from './cardItem';
import CardView from './cardView';
import './home.scss';

class Home extends Component {
  constructor() {
    super()
    this.state = {
      selectedCard: null,
      // current user that is logged in
      email: null,
      cards: []
    }
  }

  async componentDidMount() {
    // const user = auth.getCurrentUser()
    // if(!user) {
    //   this.props.history.push('/login')
    // } else {
      try {
        const { data:cards } = await getCards()
        this.setState({ cards })
      } catch (ex) {
        console.log(ex);
      }
    // }

  }

  selectCard = (cardIndex) => {
    // set the selected card to the index
    this.setState({ selectedCard: cardIndex })
  }
  render() { 
    return ( 
      <div id="home-container" className="the-card">
      <Row className='home-row'>
        <Col 
          className='card-list-col'
          xl="3"
          lg="4"
          md="4"
          sm="0"
          xs="0"
        >
          <CardItem
            selectCardFn={this.selectCard}
            cards={this.state.cards}
            userEmail={this.state.email}
            selectedCardIndex={this.state.selectedCard}   
          />
        </Col>
        <Col className='card-view-col'
          xl="9" lg="8" md="8" sm="12" xs="12"
        >
          <CardView
            user={this.state.email}
            // the index of that current card will be
            // the current selected card
            card={this.state.cards[this.state.selectedCard]}
          />
        </Col>
      </Row>
    </div>
    );
  }
}

export default Home;