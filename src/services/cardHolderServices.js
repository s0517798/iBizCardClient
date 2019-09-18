import photo from '../images/WS.jpg'
const cards = [
  {
    _id: 1,
    company: "iCode",
    slogan: "Quality Over Quantity",
    name: "Withman Simprevil",
    profession: "Web Developer",
    phone: '954-580-5298',
    email: 'Witman2@yahoo.com',
    address: "4200 SW 53rd CT.",
    website: "www.google.com",
    image: photo

  }
]

export function getCards() {
  return cards
}