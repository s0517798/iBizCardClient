import React, { Component } from 'react';
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';

class CardItem extends Component {
  state = {  }
  render() { 
    console.log(this.props);
    return ( 
      <div>
        {this.props.users.map(user => (
          <Link to={`home/${user._id}`} key={user._id} className="card-item">
            <div className="card-item-details">
              <div className="card-avatar">
                <Avatar size="80" color="red" round name={user.name} />
              </div>
              <div className="card-user">
                <div>{user.company}</div>
                <div>{user.name}</div>
                <div>{user.profession}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }
}
 
export default CardItem;