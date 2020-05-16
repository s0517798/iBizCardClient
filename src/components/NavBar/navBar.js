import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import './navBar.css'

const NavBar = ({ user, history }) => {
  return ( 
    <div id='header-nav'>
      {/* <div className='header-nav-inner'> */}
        <div className='header-logo'>
          {/* <img onClick={()=> history.push('/home')} src={require('../images/ibc.png')} /> */}
        </div>
        <div className='header-nav-right'>
          <NavLink to='/' className='header-nav-link'>home</NavLink>
          { !user && (
            <Fragment>
              <NavLink to='/about' className='header-nav-link'>about</NavLink>
              <NavLink to='/login' className='header-nav-link'>login</NavLink>
            </Fragment>
          )}
          { user && (
            <Fragment>
              <NavLink to='/profile' className="nav-item nav-link header-nav-link">{user.email}</NavLink>
              <NavLink to='/logout' className="nav-item nav-link header-nav-link">Logout</NavLink>
            </Fragment>
          )}
        </div>
      {/* </div> */}
    </div>
  );
}

export default NavBar;