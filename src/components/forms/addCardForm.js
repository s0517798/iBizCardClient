import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { endPoint } from '../../config.json'

const AddCardForm = props => {

  // it is like a constructor of default value
  const initialFormState = {
    _id: null,
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
  // default value
  const [card, setCard] = useState(initialFormState);

  // handles the input event
  const handleInputChange = e => {
    const { name, value } = e.target;

    // add the new card to the list based on names and values that it get
    // which matches the initialFormState names
    setCard({ ...card, [name]: value })
  }

  // const handleImage = e => {
  //   const { name } = e.target
  //   // get the value of the image
  //   console.log({ ...card, [name]: e.target.files[0]})
  // }

  const addCard = (card) => {
    axios.post(endPoint, card)
    setCard(card)
  }

  const handleSubmit = e => {
      e.preventDefault()
      addCard(card)
      setCard(initialFormState)
      props.history.push('/')
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
        
        <Link to='/'>
          <button type='button' className="btn btn-secondary mt-2 mb-2 mr-2">Cancel</button>
        </Link>
        <button className="btn btn-primary mt-2 mb-2">Add Card</button>
      </form>
      
      </div>
   );
}
 
export default AddCardForm;
