import { Card } from '../components/Card.js'; 
import { Section } from '../components/Section.js'; 
import { PopupWithImage } from '../components/PopupWithImage'; 
import { cardTemplate, cardListSection } from './data.js'; 
 

const popupShowCard = new PopupWithImage(".popup-card"); 
export function handleCardClick(name, src) { 
  popupShowCard.open(name, src);
  popupShowCard.setEventListeners();
}; 

const cardList = new Section({  
  renderer: (item) => { 
    const card = new Card(item.name, item.link, cardTemplate, handleCardClick); 
    const cardElement = card.generateCard(); 
    cardList.addItem(cardElement); 
  }, 
}, cardListSection);
  // отображает содержимое исходного массива  
export const displayCards = (list) => {  
    cardList.renderItems(list); 
}

// Отображает новую карточку
export const createNewCard = (list) => { 
  console.log(list);
  const newCard = new Card(list.name, list.link, cardTemplate, handleCardClick); 
  const cardElement = newCard.generateCard(); 

  cardList.addItem(cardElement);
  }