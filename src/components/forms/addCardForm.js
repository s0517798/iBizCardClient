import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../services/config.json';

const endPoint = apiUrl + '/cards';


const AddCardForm = props => {

  // it is like a constructor of default value
  const initialFormState = {
      company: '',
      slogan: '',
      name: '',
      profession: '',
      phone: '',
      email: '',
      address: '',
      website: ''
  }
  // default value
  const [card, setCard] = useState(initialFormState);

  // handles the input event
  const handleInputChange = e => {
    const { name, value } = e.target;

    // add the new card to the list based on names and values that it get
    // which matches the initialFormState names
    setCard({ ...card, [name]: value })
  }

  const addCard = async (card) => {
    let token = localStorage.getItem('token')
    try{
      await axios.post(endPoint, card, {
        headers: {
          'token': token,
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
        }
      })
      setCard(card)
      props.history.push('/profile')
    } catch(ex) {
      console.log(ex);
    }
  }

  const handleSubmit = e => {
      e.preventDefault()
      if(!card.name || !card.email) return;
      addCard(card)
      setCard(initialFormState)
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
        <h2>Add Card</h2>
      </div>
      <form
        onSubmit={handleSubmit}
      >
        {/* <div className="custom-file">
          <input type="file" className="custom-file-input" name="image" value={card.image}  onChange={handleImage} id="customFile" />
          <label className="custom-file-label" htmlFor="customFile">Choose file</label>
        </div> */}

        {renderInput('Company Name', 'company', card.company)} 
        {renderInput('Slogan', 'slogan', card.slogan)} 
        {renderInput('Name', 'name', card.name)} 
        {renderInput('Profession', 'profession', card.profession)} 
        {renderInput('Phone', 'phone', card.phone)} 
        {renderInput('Email', 'email', card.email)} 
        {renderInput('Address', 'address', card.address)} 
        {renderInput('Website', 'website', card.website)} 
        
        <Link to='/profile'>
          <button type='button' className="btn btn-secondary mt-2 mb-2 mr-2">Cancel</button>
        </Link>
        <button className="btn btn-primary mt-2 mb-2">Add Card</button>
      </form>
      
      </div>
   );
}
 
export default AddCardForm;
