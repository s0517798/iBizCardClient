
import axios from 'axios';
import { apiUrl } from '../services/config.json';



const endPoint = apiUrl + '/users';


export const SignUp = (user) => {
  return axios.post(endPoint, {
    email: user.username,
    password: user.password
  })

}
