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
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-17',
  headers: {
    authorization: 'b1d0bc39-bad2-4f4c-b6fa-24e41341eb5a',
    'Content-Type': 'application/json'
  }
});

export const userProfile = {
}

const cardList = new Section({  
  renderer: (item) => {
    const img = new Image();
    img.src = item.link;
    // Если изображение подгрузилось, то выводим карточку
    img.onload = function () {
      // Проверяем создал ли пользователь текущую карточку
      if (item.owner._id === userProfile._id) {
        const owner = true;
        createNewCard(item, owner);
      }
      else {
        const owner = false;
        createNewCard(item, owner);
      }
    }

    // Если изображение не подгрузилось, то выводим в консоль сообщение об ошибке
    img.onerror = function () { 
      console.log(`Не удалось загрузить изображение "${item.name}". Проверьте ссылку на изображение: ${item.link}`); 
    }
  }, 
}, cardListSection);
  // отображает содержимое исходного массива  
export const displayCards = (list) => {
    cardList.renderItems(list); 
}

// Отобразить новую карточку
export const createNewCard = (list, owner) => {
  
  const newCard = new Card(list, owner, userProfile, cardTemplate, handleCardClick, handleDeleteCard);
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