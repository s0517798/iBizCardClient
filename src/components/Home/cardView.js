import React, { Component } from 'react';
import './home.scss'
class CardView extends Component {
  state = {  }
  render() { 
    return ( 
      <div id='card-view'>
        <div className='card-view-card'>
          <div className='card-logo'>iBC</div>
          <div className='card-name-profession'>
            <div>Withman Simprevil</div>
            <div>Software Developer</div>
          </div>
          <div className='card-adress'>
            <div>South Florida</div>
            <div>united states 12345</div>
          </div>
          <div className='card-phone'>
            <div>954-999-9999</div>
            <div>phone 2</div>
          </div>
          <div className='card-email-website'>
            <div>withman.simprevil@gmail.com</div>
            <div>wwww.iWithman.com</div>
          </div>
          <div className='card-qr-code'>qr code</div>
        </div>
      </div>
    );
  }
}

export default CardView;