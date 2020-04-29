import http from './httpService';
import { apiUrl } from '../config.json';

const endPoint = apiUrl + '/cards';

export function getCards() {
  return http.get(endPoint)
}

export function getCard(cardId) {
  return http.get(endPoint, cardId)
}

export function saveCard(card) {
  if(card._id) {
    const theCard = {...card}
    delete theCard._id
    
    let accessToken = localStorage.getItem('accesstoken')
    return http.put(endPoint + '/' + card._id, theCard, {
      headers: {
        'accesstoken': accessToken,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
      }
    })
  } else {
    return http.post(endPoint, card)
  }
}

export function deleteCard(cardId) {
  return http.delete(endPoint, cardId)
}

export default {
  getCards,
  getCard,
  deleteCard,
  saveCard
}