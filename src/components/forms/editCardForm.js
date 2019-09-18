import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { endPoint } from '../../config.json'

const EditCardForm = props => {


  const initialFormState = {
    _id: '',
    company: '',
    slogan: '',
    name: '',
    profession: '',
    phone: '',
    email: '',
    address: '',
    website: '',
    image: ''
  }

  const [card, setCard] = useState(initialFormState);

  // handles the input event
  const handleInputChange = e => {
    const { name, value } = e.target;
    setCard({ ...card, [name]: value })
  }

  useEffect(() => {
    let mounted = true
    const displayFormValues = async () => {
      let cardId = props.match.params.id
      try {
        const a = await axios.get(`${endPoint}/${cardId}`)
        
        const c = {
          id: cardId,
          company: a.data.company,
          slogan: a.data.slogan,
          name: a.data.name,
          profession: a.data.profession,
          phone: a.data.phone,
          email: a.data.email,
          address: a.data.address,
          website: a.data.website,
        }
        if(mounted) {
          setCard(c)
        }
      } catch(ex) {
        console.log(ex);
      }
    }
    displayFormValues()

    return () => {
      console.log('Unmounted editCardForm');
      mounted = false
    }
  }, [props.match.params.id])


   // Updating a card
   const updateCard = async (card) => {
    let cardId = props.match.params.id
    const a = await axios.put(`${endPoint}/${cardId}`, card)
    
    try {
      
      const c = {
        id: props.match.params.id,
        company: a.data.company,
        slogan: a.data.slogan,
        name: a.data.name,
        profession: a.data.profession,
        phone: a.data.phone,
        email: a.data.email,
        address: a.data.address,
        website: a.data.website,
      }
      setCard(c)
      props.history.push('/')
    } catch(ex) {
      console.log(ex);
    }
  }
  

  const handleSubmit = e => {
      e.preventDefault()
      const newCard = {
        _id: props.match.params.id,
        company: e.target.company.value,
        slogan: e.target.slogan.value,
        name: e.target.name.value,
        profession: e.target.profession.value,
        phone: e.target.phone.value,
        email: e.target.email.value,
        address: e.target.address.value,
        website: e.target.website.value,
      }
      updateCard(newCard)
      setCard(newCard)
      
  }

  const renderInput = (label, name, value) => {
    return (
      <div>
        <label className="mt-3">{label}</label>
        <input type='text' className="form-control" name={name} value={value} onChange={handleInputChange} />
      </div>
    )
  } 
  
  
  return ( 
    <div>
      <div>
        <h2>Edit Card - {props.match.params.id}</h2>
      </div>
      <form
        onSubmit={handleSubmit}
      >
        {/* <div className="custom-file">
          <input type="file" className="custom-file-input" name="image" value={card.image}  onChange={handleImage} id="customFile" />
          <label className="custom-file-label" htmlFor="customFile">Choose file</label>
        </div> */}

        {renderInput('Company Name', 'company', card.company, 'company')} 
        {renderInput('Slogan', 'slogan', card.slogan, 'slogan')} 
        {renderInput('Name', 'name', card.name, 'name')} 
        {renderInput('Profession', 'profession', card.profession, 'profession')} 
        {renderInput('Phone', 'phone', card.phone, 'phone')} 
        {renderInput('Email', 'email', card.email, 'email')} 
        {renderInput('Address', 'address', card.address, 'address')} 
        {renderInput('Website', 'website', card.website, 'website')} 
        
        <Link to='/'>
          <button type='button' className="btn btn-secondary mt-2 mb-2 mr-2">Cancel</button>
        </Link>
        <button type='submit' className="btn btn-primary mt-2 mb-2">Update Card</button>
      </form>
      
      </div>
   );
}
 
export default EditCardForm;
