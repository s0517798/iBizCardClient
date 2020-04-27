import React, { useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

import './home.css';
import Cards from '../cards';

const Home = () => {

  const [user, setUser] = useState('')


  useEffect(() => {
    const getUserInfo = async () => {
      try{
        const user = await Auth.currentAuthenticatedUser()
        setUser(user)
      }catch(ex) {
        console.log(ex);
      }
    }
    getUserInfo()
  }, []);

  return ( 
    <section id='home'>
      <div className='container'>
        <h1>Home</h1>
        <Cards />
      </div>
      
    </section>
  );
}


export default Home;