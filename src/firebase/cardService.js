import { db } from './index';

export function getCards() {
  return db.collection('cards')
}

export function getCard(cardId) {
  return db.collection('cards').doc(cardId).get()
}

export function saveCard(card) {
  if(card.id) {
    const theCard = {...card}
    delete theCard.id
    
    return db.collection('cards').doc(card.id).get()
  } else {
    return db.collection('cards').doc().set(card)
  }
}

export function deleteCard(cardId) {
  return db.collection('cards').doc(cardId).delete()
}