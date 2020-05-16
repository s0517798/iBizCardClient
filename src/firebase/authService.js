import { auth } from './index';

export async function login(user) {
  return await auth.signInWithEmailAndPassword(user.email, user.password)
}

export function logout() {
  auth.signOut()
}

export function getCurrentUser() {
  try {
    
  } catch (ex) {
    return null
  }
}