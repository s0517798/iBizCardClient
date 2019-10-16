import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = ({ cards }) => {
  return ( 
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">iBC</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link to='/' className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to='/cards'>
              Card
            </Link>
          </li>
          <li className="nav-item">
            <Link to='/register' className="nav-link">Register</Link>
          </li>
          <li className="nav-item">
            <Link to='/login' className="nav-link">Login</Link>
          </li>
          
        </ul>
      </div>
    </nav>
    </div>
   );
}
 
export default NavBar;