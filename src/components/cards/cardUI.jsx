import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope, faGlobe ,faMapMarkerAlt, faEdit, faTrashAlt, faShareAltSquare  } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

import './cardUI.css';

const CardUI = ({user, card, deleteCard}) => {

  const renderIcon = (type, size) => {
    return (
      <div>
        <FontAwesomeIcon size={size} icon={type} />  
      </div>
    ) 
  }


  return ( 
    <div>
    {card ? card.map(c =>
      <section key={c._id} id="card">
      <div className="cardContainer container ">
        <div className="companyContainer">
          <h1>{c.company}</h1>
          <p>{c.slogan}</p>
        </div>
        <div className="nameContainer">
          <div className="name">
            <h3>
              <a target="blank" href={"http://www.google.com/search?q=" + c.name } >{c.name}</a>
            </h3>
            <p>{c.profession}</p>
          </div>
          <div className="contactContainer">
            <div className="icons">
              <div id="phone" className="icon">{renderIcon(faPhone)}</div>
              <div className="info">
                <a href={`tel: + ${c.phone}`}>{c.phone}</a>
              </div>
            </div>
          </div>
          <div className="contactContainer">
            <div className="icons">
              <div className="icon">{renderIcon(faEnvelope)}</div>
              <div className="info">
                <a href={`mailto: + ${c.email}`}>{c.email}</a>
              </div>
            </div>
          </div>
          <div className="contactContainer">
            <div className="icons">
              <div className="icon">{renderIcon(faGlobe)}</div>
              <div className="info">
                <a target="blank" href={`http://${c.website}`}>{c.website}</a>
              </div>
            </div>
          </div>
          <div className="contactContainer">
            <div className="icons">
              <div id="location-location" className="icon">{renderIcon(faMapMarkerAlt, 'lg')}</div>
              <div id="location-details" className="info">{c.address}</div>
            </div>
          </div>
          <div className="modificationCotainer">
          <div className="share-icon">
            <Link to='#' >
              <FontAwesomeIcon style={{cursor: 'pointer', color: '#d2a17c'}} size="xs" icon={faShareAltSquare} />          
            </Link>
          </div>
          {user &&(<div className="edit-icon">
            <Link to={`/profile/${c._id}`} style={{ color: 'inherit'}}>
              <FontAwesomeIcon style={{cursor: 'pointer'}} className="mr-2" size="xs" icon={faEdit} />
            </Link>
          </div>)}
          {user &&(<div className="delete-icon">
            <Link to='#' style={{ color: 'inherit'}}>
              <FontAwesomeIcon style={{cursor: 'pointer'}} size="xs" icon={faTrashAlt} onClick={() => deleteCard(c)} />          
            </Link>
          </div>)}
          </div>
        </div>
      </div>
    </section>
    )
    
    : <div><h1>The Are No Card</h1></div>}
    
    </div>
   );
}
 
export default CardUI;