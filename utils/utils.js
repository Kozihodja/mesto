import { Card } from '../components/Card.js';
import { Section } from '../components/Section.js';
import { PopupWithImage } from '../components/PopupWithImage';
import { cardTemplate, cardListSection } from './data.js';

export function handleCardClick(name, src) {
  const popup = new PopupWithImage(".popup-card", name, src);
  popup.open();
};
  
export const createCard = (list) => {
    const cardList = new Section({
      data: list,
      renderer: (item) => {
        const card = new Card(item.name, item.link, cardTemplate, handleCardClick);
        const cardElement = card.generateCard();
    
        cardList.addItem(cardElement);
      },
    
    }, cardListSection);
  
    cardList.renderItems();
  }