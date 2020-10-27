import React, { Component } from 'react';
import { auth } from '../../firebase/index';
import { getCards, deleteCard } from '../../firebase/cardService';
import { toast } from 'react-toastify';
import { Row } from 'reactstrap';
import CardItem from './cardItem';
import { db } from '../../firebase/cardService'
import './cards.css';

class Cards extends Component {
  state = {
      data: [],
      message: null
    }

  async componentDidMount() {
      auth.onAuthStateChanged(async user => {
        if(user) {
          try {
            const cards  = await getCards()
              cards.onSnapshot(
              snapshot => {
                this.getData(snapshot.docs)
              }
            ) 
          } catch (ex) {
            const message = ex.message
            this.setState({ message })
          }
        } else {
          this.setState({ data: []})
        }
      })
  }

  getData = (data) => {
    let cards = []
    data.forEach(doc => {
      cards.push(
        // id: doc.id,
        {id: doc.id, ...doc.data()}
      )
    })
    this.setState({ data: cards })
  }

  selectCard = (cardIndex) => {
    // set the selected card to the index
    this.setState({ selectedCard: cardIndex })
  }

  handleDelete = async (card) => {
    const initialCard = this.state.data;

    const data = initialCard.filter(c => c.id !== card.id)
    this.setState({ data })

    try {
      await deleteCard(card)
      
    } catch (ex) {
      if(ex.response && ex.response.status === 404) {
        toast.error('This card deleted already.')

        this.setState({ data: initialCard })
      }
    }
  }

  handleFavorite = (e) => {

  }

  handleShare = () => {

  }
  
  
  
  render() { 
    const { data } = this.state
    return ( 
      <div id="card-container" className="the-card">
      <Row className='card-row'>
        <h1>{this.state.message}</h1>
        <CardItem 
          cards={data}
          props={this.props}
          onDelete={this.handleDelete}
        />
        {/* <CardView 
          props={this.props}
          cards={cards}
        /> */}
      </Row>
    </div>
    );
  }
}

export default Cards;