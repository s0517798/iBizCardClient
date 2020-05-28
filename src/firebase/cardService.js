import { db } from './index';

export function getCards() {
  return db.collection('cards')
}