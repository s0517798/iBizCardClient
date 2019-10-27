import { useEffect } from 'react';
import { Auth } from 'aws-amplify';

const Logout = () => {

  useEffect(() => {
    Auth.signOut()
    localStorage.removeItem('token')
    localStorage.removeItem('accesstoken')
    console.log('User logged out...');
    window.location = '/';
  }, []);

  return null
}
 
export default Logout;