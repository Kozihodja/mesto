import { Card } from '../components/Card.js'; 
import { Section } from '../components/Section.js'; 
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupConfirmation } from '../components/PopupConfirmation.js';
import { cardTemplate, cardListSection } from './data.js'; 
import { Api } from '../components/Api.js';
 
export const popupShowCard = new PopupWithImage(".popup-card");
// Обработчик события нажатия на карточку
export function handleCardClick(name, src) { 
  popupShowCard.open(name, src);
};

export const popupDeleteCard = new PopupConfirmation({ 
  popupSelector: ".popup-delete", 
  handleFormSubmit: (id, element) => {
    api.deleteCard(id)
    .then(result => {
      element.remove();
      popupDeleteCard.close();
   })
   .catch(function(err) {
     console.log(`При удалении карточки возникла ошибка: ${err}`);
   });
  } 
});

export function handleDeleteCard(id, element) { 
  popupDeleteCard.open(id, element);
};

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-19',
    headers: {
      authorization: '8686f633-5196-4d18-a390-f58a0ff5520c',
      'Content-Type': 'application/json'
  }
});

export const userProfile = {}

const cardList = new Section({  
  renderer: (item) => {
      // Проверяем создал ли пользователь текущую карточку
      if (item.owner._id === userProfile._id) {
        const owner = true;
        createNewCard(item, owner);
      }
      else {
        const owner = false;
        createNewCard(item, owner);
      }
  }, 
}, cardListSection);
  // отображает содержимое исходного массива  
export const displayCards = (list) => {
    cardList.renderItems(list); 
}

const hendleLikeClick = (card, cardId) => {
  const likeBtn =  card.querySelector('.element__like-icon');
  const countElement = card.querySelector('.element__like-count')
        if (likeBtn.classList.contains('element__like-icon_liked')) {
            likeBtn.classList.remove('element__like-icon_liked');
            api.deleteLike(cardId)
            .then(result => {
              countElement.textContent = result.likes.length;
              })
              .catch((err) => {
                console.log(`При удалении лайка возникла ошибка: ${err}`);
              });
        }
        else { 
            api.addLike(cardId)
            .then(result => {
                countElement.textContent = result.likes.length;
                likeBtn.classList.add('element__like-icon_liked');
              })
              .catch((err) => {
                console.log(`При добавлении лайка возникла ошибка: ${err}`);
              });    
        }
}

// Отобразить новую карточку
export const createNewCard = (list, owner) => {
  
  const newCard = new Card(list, owner, userProfile._ids, cardTemplate, handleCardClick, handleDeleteCard, hendleLikeClick);
  const cardElement = newCard.generateCard(); 

  cardList.addItem(cardElement);
  return newCard;
  }
// Изменить текстконтент сабмита формы во время выполнения запросов
export function renderLoading(isLoading, form) {
    const renderedEl = form.querySelector(".form__submit");
    if (isLoading) {
      renderedEl.textContent = "Сохранение...";
    }
    else {
      renderedEl.textContent = "Сохранение"
}}