import React, { Component } from 'react';
// import CardUI from '../old-cards/cardUI';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
// import { getCards, deleteCard } from '../../services/cardService';
import Avatar from 'react-avatar';
import { storage } from '../../firebase';
import './profile.css';


class Profile extends Component {
  state = { 
    image: null,
    url: 'http://via.placeholder.com/150x130',
    message: ''
  }

  handleImageChange = e => {
    if(e.target.files[0]) {
      this.setState({ image: e.target.files[0] })
    }
  }

  handleUpload = (e) => {
    const { image } = this.state

    e.preventDefault()
    try {
      const user = this.props.user
      const uploadTask = storage.ref(`users/${user.uid}/${image.name}`).put(image)
      this.setState({ uploadTask })
    } catch (ex) {
      const error = ex.message
      this.setState({ error })
    }

  }
  
  render() { 
    const { displayName, email, photoUrl } = this.props
    return ( 
      <div id='profile'>
        <h1>Profile</h1>
        <hr />
        <Row className='profile-body'>
          <Col 
            xl="3"
            lg="4"
            md="4"
            sm="0"
            xs="0" 
            className='profile-left'
          >
            <Row className='profile-card'>
              <Col  
                className='profile-avatar'
              >
                <div className='image-upload'>
                <Avatar size="150" color="red" round src={ photoUrl } />
                
                </div>
              </Col>
              <Col className='profile-contact'>
                <div>{displayName}</div>
                <div>{email}</div>
                <div>phone</div>
              </Col>
            </Row>
          </Col>
          <Col  
            xl="9" 
            lg="8" 
            md="8" 
            sm="12" 
            xs="12"
            className='profile-right'
          >my Card info
          <div>
            <input type='file' onChange={this.handleImageChange}></input>
            <button onClick={this.handleUpload}>upload</button>
            <Link to='profile/new'>
            ADD
            </Link>
          </div>
          </Col>
        </Row>
        {/* <div>
          <Row>
            <Col xs="12" sm="12" md="12">
              <CardUI 
                user={user} 
                card={cards} 
                onDeleteCard={this.handleDeleteCard}
              />
            </Col>
            <Col>
            </Col>
          </Row>
        </div>
      <div>
        { user && cards.length > 0 ? null : 
          <div>
            <Link to='/profile/new'>
              <FontAwesomeIcon style={styles.addButton}  icon={faPlusCircle} />
            </Link>
          </div>
        }
      </div> */}
    </div>
    );
  }
}

export default Profile;