import React, { Component } from 'react';
import { getCard, saveCard } from '../../firebase/cardService';
import { db } from '../../firebase';

class CardForm extends Component {
  state = { 
    data: {
      // logo: '',
      company: '',
      slogan: '',
      fullName: '',
      profession: '',
      address1: '',
      address2: '',
      phone: '',
      email: '',
      website: ''
    },
    errors: ''
  }

  async componentDidMount() {
    
    try {
      const cardId = this.props.match.params.id
      if(cardId === 'new') return

      // const card = await getCard(cardId)
      // this.setState({ data: this.cardViewModel(card.data())  })

      const doc = await db
        .collection('cards')
        .doc(cardId)
        .get()
        this.setState({ data: this.cardViewModel(doc.data()) })
    } catch (ex) {
      console.log(ex);
    }
  }

  cardViewModel(card) {
    return {
        // logo: card.logo,
        // id: card.id,
        company: card.company,
        slogan: card.slogan,
        fullName: card.fullName,
        profession: card.profession,
        phone: card.phone,
        email: card.email,
        address1: card.address1,
        address2: card.address2,
        website: card.website,
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    const data = {...this.state.data}
    data[name] = value
    this.setState({ data })
  }

  formatPhoneNumber = (number) => {
    var cleaned = ('' + number).replace(/\D/g, '')
    var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      return '(' + match[1] + ') ' + match[2] + '-' + match[3]
    }
    return null
  }

  handleSubmit = async (e) => {
    e.preventDefault()
    const { logo, company, slogan, fullName, profession, address1, address2, phone, email, website } = this.state.data  

    db.collection('cards').doc().set({ 
      // logo: logo,
      company: company,
      slogan: slogan,
      fullName: fullName,
      profession: profession,
      phone: this.formatPhoneNumber(phone),
      email: email,
      address1: address1,
      address2: address2,
      website: website
    })
      // await saveCard(this.state.data)
      
      this.props.history.push('/cards')
  }

  renderInput = (label, name) => {
    const { data } = this.state
    return (
      <div>
        <label className="mt-3">{label}</label>
        <input type='text' className="form-control" name={name} value={data[name]} onChange={this.handleInputChange} />
      </div>
    )
  } 

  handleImageChange = e => {
    if(e.target.files[0]) {
      this.setState({ logo: e.target.files[0] })
    }
  }

  renderImageInput = () => {
    return (
      <input type='file' placeholder='Upload your logo' onChange={this.handleImageChange}></input>
    )
  }
  
  goBack = () => {
    this.props.history.goBack()
  }

  render() { 
    return ( 
      <div style={{ margin: '15px' }}>
        <div>
          <h2>Card Form - {this.props.match.params.id}</h2>
        </div>
        <form onSubmit={this.handleSubmit}>
          {/* {this.renderImageInput()} */}
          {this.renderInput('Company Name', 'company')} 
          {this.renderInput('Slogan', 'slogan')} 
          {this.renderInput('Full name', 'fullName')} 
          {this.renderInput('Profession', 'profession')} 
          {this.renderInput('Phone', 'phone')} 
          {this.renderInput('Email', 'email')} 
          {this.renderInput('Address1', 'address1')} 
          {this.renderInput('Address2', 'address2')} 
          {this.renderInput('Website', 'website')} 
          <button onClick={this.goBack} type='button' className="btn btn-secondary mt-2 mb-2 mr-2">Cancel</button>
          <button type='submit' className="btn btn-primary mt-2 mb-2">Save</button>
        </form>
      </div>
    );
  }
}

export default CardForm;