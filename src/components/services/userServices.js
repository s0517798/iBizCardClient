
import axios from 'axios';
import { apiUrl } from '../services/config.json';



const endPoint = apiUrl + '/users';


export function register(company, email, password, isAdmin) {
  return axios.post(endPoint, {company, email, password, isAdmin},
  { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' } }
  )
}
