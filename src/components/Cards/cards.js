import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { auth, db } from '../../firebase/index';
import firebase from '../../firebase/index'
import { getCards, deleteCard } from '../../services/cardService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch  } from '@fortawesome/free-solid-svg-icons';
import CardItem from './cardItem';
import CardView from './cardView';
import './cards.scss';

class Cards extends Component {
  constructor() {
    super()
    this.state = {
      selectedCard: null,
      data: []
    }
  }

  async componentDidMount() {
    // const user = auth.getCurrentUser()
    // if(!user) {
    //   this.props.history.push('/login')
    // } else {
      auth.onAuthStateChanged(async user => {
        if(user) {
          // console.log('user logged in:', user);
          try {
              await firebase.firestore().collection('cards').onSnapshot(
              snapshot => {
                this.getData(snapshot.docs)
              }
            ) 
          } catch (ex) {
            const message = ex.message
            console.log(message);
            this.setState({ message })
          }
        } else {
          this.setState({ data: []})
        }
      })
    // }

  }

  getData = (data) => {
    let cards = []
    data.forEach(doc => {
      cards.push({
        id: doc.id,
        data: doc.data()
      })
    })
    this.setState({ data: cards })
  }

  selectCard = (cardIndex) => {
    // set the selected card to the index
    this.setState({ selectedCard: cardIndex })
  }

  handleFavorite = (e) => {

  }

  handleShare = () => {

  }
  
  
  
  render() { 
    return ( 
      <div id="card-container" className="the-card">
      <Row className='card-row'>
        <Col 
          className='card-list-col'
          xl="3"
          lg="4"
          md="4"
          sm="0"
          xs="0"
        >
          <div className='search-bar'>
            <h1 className='search-header'>
              Cards
            </h1>
            <input placeholder='Search Cards'/>
          </div>
          <CardItem
            selectCardFn={this.selectCard}
            cards={this.state.data}
            userEmail={this.state.email}
            selectedCardIndex={this.state.selectedCard}   
            onFavorite={this.handleFavorite}
          />
        </Col>
        <Col className='card-view-col'
          xl="9" lg="8" md="8" sm="12" xs="12"
        >
          <CardView
            user={this.state.email}
            // the index of that current card will be
            // the current selected card
            onShare={this.handleShare}
            card={this.state.data[this.state.selectedCard]}
          />
        </Col>
      </Row>
    </div>
    );
  }
}

export default Cards;