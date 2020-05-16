import jwtDecode from 'jwt-decode';

function getcurrentUser() {
  try{
    // get the token
    const jwt = localStorage.getItem('accesstoken')
    // get us the current user object
    return jwtDecode(jwt)
  } catch(ex) {
    return null
  }
}

function getJwt() {
  return localStorage.getItem('accesstoken')
}

async function refreshToken() {
  try{
    // const currentSession =  await Auth.currentSession();
    // return currentSession.refreshToken.token
  }catch(ex) {
    console.log('Not able to refresh token:', ex);
  }
}


export default {
  getcurrentUser,
  getJwt,
  refreshToken
}