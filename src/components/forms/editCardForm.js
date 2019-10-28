import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { apiUrl } from '../services/config.json';

const endPoint = apiUrl + '/cards';

const EditCardForm = (props) => {

  console.log('props.user',props.user);

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
  }

  console.log('pros: => ', props);


  const [ACard, setACard] = useState(initialFormState);

  // handles the input event
  const handleInputChange = e => {
    const { name, value } = e.target;
    setACard({ ...ACard, [name]: value })
  }

  useEffect(() => {
    let mounted = true

    const displayFormValues = async (card) => {
      const cardId = props.match.params.id
      const aCard = await axios.get(`${endPoint}/${cardId}`, card )
      console.log(aCard);
      try {
        const editCard = {
          id: cardId,
          company: aCard.data.company,
          slogan: aCard.data.slogan,
          name: aCard.data.name,
          profession: aCard.data.profession,
          phone: aCard.data.phone,
          email: aCard.data.email,
          address: aCard.data.address,
          website: aCard.data.website,
        }
        if(mounted) {
          setACard(editCard)
          
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
    const cardId = props.match.params.id
    let token = localStorage.getItem('token')
    const a = await axios.put(`${endPoint}/${cardId}`, card, {
      headers: {
        'token': token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      }
    })
    
    try {
      
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
      setACard(c)
      props.history.push('/profile')
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
      setACard(newCard)
      updateCard(newCard)
  }

  const renderInput = (label, name, value) => {
    return (
      <div>
        <label className="mt-3">{label}</label>
        <input type='text' className="form-control" name={name} value={value} onChange={handleInputChange} />
      </div>
    )
  } 
  
  const goBack = () => {
    props.history.goBack()
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

        {renderInput('Company Name', 'company', ACard.company, 'company')} 
        {renderInput('Slogan', 'slogan', ACard.slogan, 'slogan')} 
        {renderInput('Name', 'name', ACard.name, 'name')} 
        {renderInput('Profession', 'profession', ACard.profession, 'profession')} 
        {renderInput('Phone', 'phone', ACard.phone, 'phone')} 
        {renderInput('Email', 'email', ACard.email, 'email')} 
        {renderInput('Address', 'address', ACard.address, 'address')} 
        {renderInput('Website', 'website', ACard.website, 'website')} 
        
        
        <button onClick={goBack} type='button' className="btn btn-secondary mt-2 mb-2 mr-2">Cancel</button>
        
        <button type='submit' className="btn btn-primary mt-2 mb-2">Update Card</button>
      </form>
      
      </div>
   );
}
 
export default EditCardForm;
