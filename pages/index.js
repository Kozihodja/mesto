import { Card } from '../components/Card.js';
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { FormValidation } from '../components/FormValidation.js';
import { UserInfo } from '../components/UserInfo.js';
import { Section } from '../components/Section.js';

const editProfileButton = document.querySelector(".profile__edit-button");

const addNewPlaceButton = document.querySelector(".profile__add-button");

const editPopup = document.querySelector(".popup-edit");
const editProfileForm = editPopup.querySelector(".form");
const nameInput = editProfileForm.querySelector(".form__input_name");
const jobInput = editProfileForm.querySelector(".form__input_job");
const name = document.querySelector(".profile__name");
const job = document.querySelector(".profile__job");

const formList = Array.from(document.querySelectorAll(".form"));

export const cardTemplate = document.querySelector('#element');
const cardListSection = '.elements__list';

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export function handleCardClick(name, src) {
  const popup = new PopupWithImage(".popup-card", name, src);
  popup.open();
};

export const validationConfig  = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error', 
  errorClass: 'form__input-error_active"',
};

function createCard(list) {
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

createCard(initialCards);

// При нажатии на кнопку добавить - открыть форму добавления новой карточки 
addNewPlaceButton.addEventListener("click", () => 
  {
    const popup = new PopupWithForm({
      popupSelector: ".popup-add",
      handleFormSubmit: (list) => {
        createCard([{name: list.placeName, link: list.placeImg}]);
      }
    });
    popup.open();
  }
); 

editProfileButton.addEventListener("click", () => 
  {

    const user = new UserInfo(".profile__name", ".profile__job");
    user.getUserInfo(nameInput, jobInput, name.textContent, job.textContent);

    const popup = new PopupWithForm({
      popupSelector: ".popup-edit",
      handleFormSubmit: (list) => {
        user.setUserInfo(list.userName, list.userJob);
      }
    });
    popup.open();
  }
); 

// Проверка на валидность формы
formList.forEach((form) => {
  const formValid = new FormValidation(validationConfig, form);
  formValid.enableValidation();
});