import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { getCards, deleteCard } from '../../services/cardService';
import CardItem from './cardItem';
import CardView from './cardView';
import './home.scss';

class Home extends Component {
  state = {  }
  render() { 
    
    return ( 
      <div id="home-container" className="the-card">
      <Row>
        <Col 
          className='card-list'
          xl="3"
          lg="4"
          md="4"
          sm="0"
          xs="0"
        >
          <CardItem
            users={[
              {
                _id: '1',
                company:"iBizCard",
                name: "Withman Simprevil",
                profession: "Software Developer"
              },
              {
                _id: '2',
                company:"WS Photography",
                name: "Withman Simprevil",
                profession: "Photographer"
              },
              {
                _id: '3',
                company:"JD&JC",
                name: "Jean Joselyn",
                profession: "Trucking"
              },
              {
                _id: '4',
                company:"iFixIt",
                name: "Steve Simprevil",
                profession: "AC Tech."
              }
            ]}
          
          />
        </Col>
        <Col className='card-body-right'>
          <CardView 
          />
        </Col>
      </Row>
    </div>
    );
  }
}

export default Home;