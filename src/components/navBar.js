import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = ({ user }) => {

  return ( 
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      {/* <Link className="navbar-brand" to="/">iBC</Link> */}
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <div className='navbar-nav'>
          {/* <NavLink to='/' className="nav-item nav-link">Home</NavLink> */}
          {/* <NavLink className="nav-item nav-link" to='/cards'>
            Card
          </NavLink> */}
          {!user && (
            <React.Fragment>
              <NavLink to='/' className="nav-item nav-link">Login/Register</NavLink> 
            </React.Fragment>
          )}
          {user && (
            <React.Fragment>
              <NavLink to='/home' className="nav-item nav-link">Home</NavLink>
              <NavLink to={user.username} className="nav-item nav-link">{user.username}</NavLink>
              <NavLink to='/logout' className="nav-item nav-link">Logout</NavLink>
            </React.Fragment>
          )
            
          }
        </div>
      </div>
    </nav>
   );
}
 
export default NavBar;