import http from './httpService';
import { apiUrl } from '../config.json';

const endPoint = apiUrl + '/cards';

function cardUrl(id) {
  return `${endPoint}/${id}`
}

export function getCards() {
  return http.get(endPoint)
}

export function getCard(cardId) {
  return http.get(cardUrl(cardId))
}

export function saveCard(card) {
  if(card._id) {
    const theCard = {...card}
    delete theCard._id
    
    let accessToken = localStorage.getItem('accesstoken')
    return http.put(cardUrl(card._id), theCard, {
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
  return http.delete(cardUrl(cardId))
}

export default {
  getCards,
  getCard,
  deleteCard,
  saveCard
}