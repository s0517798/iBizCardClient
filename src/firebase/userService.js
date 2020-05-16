import { auth } from './index';

export function register(user) {
  
    return auth.createUserWithEmailAndPassword(user.email, user.password)
  
}