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


export default {
  getcurrentUser,
  getJwt
}