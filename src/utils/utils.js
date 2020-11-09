import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage';
import { cardTemplate, cardListSection } from './data.js';

const popup = new PopupWithImage(".popup-card");
export function handleCardClick(name, src) {
  popup.open(name, src);
  popup.setEventListeners();
};
const card = new Card(cardTemplate, handleCardClick);
const cardList = new Section({
  renderer: (item) => {
    const cardElement = card.generateCard(item.name, item.link);
    cardList.addItem(cardElement);
  },

}, cardListSection);

export const createCard = (list) => { 
    cardList.renderItems(list);
  }

const newCard = new Section({
    renderer: () => {       
    },
  }, cardListSection);

export const createNewCard = (list) => {
    console.log(list);
    const cardElement = card.generateCard(list.placeName, list.placeImg);
    newCard.addItem(cardElement);
  }
 