import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return ( 
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navbar-brand" to="/">iBusiness Card</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavDropdown">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to='/'>
              Cards 
            </Link>
          </li>
          <li className="nav-item active">
            <Link className="nav-link" to='/addCardForm'>
              {/* Cards  */}
            </Link>
          </li>
          <li className="nav-item">
            <Link to='/about' className="nav-link">About</Link>
          </li>
          
        </ul>
      </div>
    </nav>
    </div>
   );
}
 
export default NavBar;