import React from 'react';
import { Row, Col } from 'reactstrap';
import './home.scss';
import CardItem from './cardItem';

const Home = (props) => {
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
              OnSelect={id => {
                this.props.history.push(`/profile/${id}`)
              }}
              props={props}
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
            <div>Render each card here</div>
          </Col>
          
        </Row>
      </div>
  );
}


export default Home;