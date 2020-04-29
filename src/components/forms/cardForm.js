import React, { Component } from 'react';
import { getCard, saveCard } from '../../services/cardService';

class CardForm extends Component {
  state = { 
    data: {
      company: '',
      slogan: '',
      name: '',
      profession: '',
      phone: '',
      email: '',
      address: '',
      website: ''
    }
  }

  async componentDidMount() {
    try {
      const cardId = this.props.match.params.id
      if(cardId === 'new') return

      const { data: card } = await getCard(cardId)
      this.setState({ data: this.mapToViewModel(card) })
    } catch (ex) {
      
    }
  }

  mapToViewModel(card) {
    return {
        _id: card[0]._id,
        company: card[0].company,
        slogan: card[0].slogan,
        name: card[0].name,
        profession: card[0].profession,
        phone: card[0].phone,
        email: card[0].email,
        address: card[0].address,
        website: card[0].website,
    }
  }

  handleInputChange = ({ currentTarget: input }) => {
    const data = {...this.state.data}
    data[input.name] = input.value
    this.setState({ data })
  }

  handleSubmit = async e => {
      e.preventDefault()
      await saveCard(this.state.data)
      window.location = '/profile'
  }

  renderInput = (label, name, value) => {
    return (
      <div>
        <label className="mt-3">{label}</label>
        <input type='text' className="form-control" name={name} value={value} onChange={this.handleInputChange} />
      </div>
    )
  } 
  
  goBack = () => {
    this.props.history.goBack()
  }

  render() { 
    const { data: card } = this.state
    return ( 
      <div>
        <div>
          <h2>Card Form - {this.props.match.params.id}</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('Company Name', 'company', card.company, 'company')} 
          {this.renderInput('Slogan', 'slogan', card.slogan, 'slogan')} 
          {this.renderInput('Name', 'name', card.name, 'name')} 
          {this.renderInput('Profession', 'profession', card.profession, 'profession')} 
          {this.renderInput('Phone', 'phone', card.phone, 'phone')} 
          {this.renderInput('Email', 'email', card.email, 'email')} 
          {this.renderInput('Address', 'address', card.address, 'address')} 
          {this.renderInput('Website', 'website', card.website, 'website')} 
          <button onClick={this.goBack} type='button' className="btn btn-secondary mt-2 mb-2 mr-2">Cancel</button>
          <button type='submit' className="btn btn-primary mt-2 mb-2">Update Card</button>
        </form>
      </div>
    );
  }
}

export default CardForm;