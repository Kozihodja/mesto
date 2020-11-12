import { Card } from '../components/Card.js'; 
import { Section } from '../components/Section.js'; 
import { PopupWithImage } from '../components/PopupWithImage'; 
import { cardTemplate, cardListSection } from './data.js'; 
 

export const popupShowCard = new PopupWithImage(".popup-card"); 
export function handleCardClick(name, src) { 
  popupShowCard.open(name, src);
}; 

const cardList = new Section({  
  renderer: (item) => { 
    createNewCard(item);
  }, 
}, cardListSection);
  // отображает содержимое исходного массива  
export const displayCards = (list) => {  
    cardList.renderItems(list); 
}

// Отображает новую карточку
export const createNewCard = (list) => { 
  const newCard = new Card(list.name, list.link, cardTemplate, handleCardClick); 
  const cardElement = newCard.generateCard(); 

  cardList.addItem(cardElement);
  }