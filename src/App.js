import React from 'react';

import Main from './components/main';
import NavBar from './components/navBar';


const App = () => {
  return ( 
    <div>
      <NavBar />
      <div className='container'>
        <Main />
      </div>
    </div>
   );
}
 
export default App;