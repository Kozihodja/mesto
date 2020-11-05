import { Card } from './Card.js';
import { FormValidation } from './FormValidation.js';

const editProfileButton = document.querySelector(".profile__edit-button");
const elementsList =  document.querySelector(".elements__list")
const popupList = Array.from(document.querySelectorAll(".popup"));

const popupAdd = document.querySelector(".popup-add");
const addNewPlaceButton = document.querySelector(".profile__add-button");
const addNewPlaceForm = popupAdd.querySelector(".form");
const placeName = popupAdd.querySelector(".form__input_name");
const placeLink = popupAdd.querySelector(".form__input_job");

const editPopup = document.querySelector(".popup-edit");
const editProfileForm = editPopup.querySelector(".form");
const nameInput = editProfileForm.querySelector(".form__input_name");
const jobInput = editProfileForm.querySelector(".form__input_job");
const name = document.querySelector(".profile__name");
const job = document.querySelector(".profile__job");

const imagePopup = document.querySelector('.expand');
const formList = Array.from(document.querySelectorAll(".form"));

const cardTemplate = document.querySelector('#element');

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

export function handleImgClick(name, src) {
  imagePopup.querySelector(".expand__title").textContent = name;
  imagePopup.querySelector(".expand__img").src = src;
  imagePopup.classList.add('popup_opened');
  document.addEventListener("keydown", handleEscKeyDown);
};

export const validationConfig  = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error', 
  errorClass: 'form__input-error_active"',
};

// Обработчик события нажатия на кнопку
function handleEscKeyDown(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    togglePopup(openedPopup);
  }
}

// Функция добавляет или удаляет класс у элемента
function togglePopup(elName, className='popup_opened') {
  elName.classList.toggle(className);
  if (elName.classList.contains(className)) {
    document.addEventListener("keydown", handleEscKeyDown);
  }
  else {
    document.removeEventListener("keydown", handleEscKeyDown);
  }
}

// Функция устанавливает слушатели на кнопку закрытия попапа, оверлей попапа
const setListenersSwitchForPopup = () => {
  // установить слушатели на каждом элементе массива
  popupList.forEach((listElement) => {
    const popupCloseButton = listElement.querySelector(".popup__close");

    popupCloseButton.addEventListener("click", (evt) => {
      togglePopup(listElement);
    });

    listElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        togglePopup(listElement);
      }
    });
  });
};

// Функция создает новые карточки
const createCard = (name, link) => {
  const card = new Card(name, link, cardTemplate, handleImgClick);
  const cardElement = card.generateCard();
  return cardElement
}

// При нажатии на кнопку редактировать открыть форму редактирования профиля
editProfileButton.addEventListener("click", () => {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  togglePopup(editPopup);
});

// При нажатии на кнопку добавить - открыть форму добавления новой карточки 
addNewPlaceButton.addEventListener("click", () => 
  togglePopup(popupAdd) 
); 

// Проверка на валидность формы
formList.forEach((form) => {
  const formValid = new FormValidation(validationConfig, form);
  formValid.enableValidation();
});

// При нажатии на кнопку сохранить в форме редактирования профиля сохранить значения и закрыть форму
editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  togglePopup(editPopup, "popup_opened");
});

// Обработчик события нажатия на кнопку сохранить в форме добавления карточки
addNewPlaceForm.addEventListener("submit", () => {
  elementsList.prepend(createCard(placeName.value, placeLink.value));
});

// Вызов функции, которая ищет все попапы, и навешивает слушатели
setListenersSwitchForPopup();

// Создание карточек на основе исходного массива
initialCards.forEach((item) => {
  document.querySelector(".elements__list").prepend(createCard(item.name, item.link));
});