import { Card } from '../components/Card.js'; 
import { Section } from '../components/Section.js'; 
import { PopupWithImage } from '../components/PopupWithImage'; 
import { cardTemplate, cardListSection } from './data.js'; 
 

const popup = new PopupWithImage(".popup-card"); 
export function handleCardClick(name, src) { 
  popup.open(name, src);
  popup.setEventListeners();
}; 

const cardList = new Section({  
  renderer: (item) => { 
    const card = new Card(item.name, item.link, cardTemplate, handleCardClick); 
    const cardElement = card.generateCard(); 
    cardList.addItem(cardElement); 
  }, 
}, cardListSection);
  // отображает содержимое исходного массива  
export const createCard = (list) => {  
    cardList.renderItems(list); 
}

const newCardSection = new Section({  
    renderer: () => {     
    },  
}, cardListSection);

// Отображает новую карточку
export const createNewCard = (list) => { 
  console.log(list);
  const newCard = new Card(list.name, list.link, cardTemplate, handleCardClick); 
  const cardElement = newCard.generateCard(); 

  newCardSection.addItem(cardElement);
  }