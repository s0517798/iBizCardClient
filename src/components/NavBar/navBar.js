import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';

import './navBar.css'

const NavBar = ({ user, history, location, match }) => {
  // const { username } = match.params
  // console.log(username);
  
  return ( 
    <header>
        <nav id='header-nav'>
          <div className='header-nav-inner'>
            <div className='header-logo'>
              <img onClick={()=> history.push('/')} src={require('../images/ibc.png')} />
            </div>
            <div className='header-nav-right'>
              <NavLink to='/' className='header-nav-link'>home</NavLink>
              { !user && (
                <Fragment>
                  <NavLink to='/about' className='header-nav-link'>about</NavLink>
                  <NavLink to='/accounts/login' className='header-nav-link'>login</NavLink>
                </Fragment>
              )}
              { user && (
                <Fragment>
                  <NavLink to='/profile' className="nav-item nav-link header-nav-link">user name</NavLink>
                  <NavLink to='/logout' className="nav-item nav-link header-nav-link">Logout</NavLink>
                </Fragment>
              )}
            </div>
          </div>
        </nav>
      </header>
    // <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    //   {/* <Link className="navbar-brand" to="/">iBC</Link> */}
    //   <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    //     <span className="navbar-toggler-icon"></span>
    //   </button>
    //   <div className="collapse navbar-collapse" id="navbarNavDropdown">
    //     <div className='navbar-nav'>
    //       {/* <NavLink to='/' className="nav-item nav-link">Home</NavLink> */}
    //       {/* <NavLink className="nav-item nav-link" to='/cards'>
    //         Card
    //       </NavLink> */}
    //       {!user && (
    //         <React.Fragment>
    //           <NavLink to='/' className="nav-item nav-link">Login/Register</NavLink> 
    //         </React.Fragment>
    //       )}
    //       {user && (
    //         <React.Fragment>
    //           <NavLink to='/home' className="nav-item nav-link">Home</NavLink>
    //           <NavLink to={user.username} className="nav-item nav-link">{user.username}</NavLink>
    //           <NavLink to='/logout' className="nav-item nav-link">Logout</NavLink>
    //         </React.Fragment>
    //       )
            
    //       }
    //     </div>
    //   </div>
    // </nav>
   );
}
 
export default NavBar;