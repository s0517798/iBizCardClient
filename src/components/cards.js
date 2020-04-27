import React, { Component } from 'react';
import { getCards, deleteCard } from '../services/cardService';


class Cards extends Component {
  state = { 
    cards: []
  }

  async componentDidMount() {
    const cards = await getCards()
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
    console.log(this.props.user);
    return ( 
      <div className='row'>
        <div className='col'>

        </div>
      </div>
    );
  }
}

export default Cards;