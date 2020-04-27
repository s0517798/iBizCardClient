import http from './httpService';
import { apiUrl } from '../config.json';

const endPoint = apiUrl + '/cards';

export function getCards() {
  return http.get(endPoint)
}

export function getCard(cardId) {
  return http.get(endPoint, cardId)
}

export function saveCard() {

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