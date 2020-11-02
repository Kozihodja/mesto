import { Card } from './card.js';
import { FormValidation } from './validate.js';

const editProfileButton = document.querySelector(".profile__edit-button");

const popupList = Array.from(document.querySelectorAll(".popup"));

const popupAdd = document.querySelector(".popup-add");
const addNewPlaceButton = document.querySelector(".profile__add-button");
const addNewPlaceForm = popupAdd.querySelector(".form");
const placeName = popupAdd.querySelector(".form__input_name");
const placeLink = popupAdd.querySelector(".form__input_job");

const popup = document.querySelector(".popup-edit");
const editProfileForm = popup.querySelector(".form");
const nameInput = editProfileForm.querySelector(".form__input_name");
const jobInput = editProfileForm.querySelector(".form__input_job");
const name = document.querySelector(".profile__name");
const job = document.querySelector(".profile__job");

export const expand = document.querySelector('.expand');
const formList = Array.from(document.querySelectorAll(".form"));

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

export const validationConfig  = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error', 
  errorClass: 'form__input-error_active"',
};

// Обработчик события нажатия на кнопку
export function listenerEscKeyDown(evt) {
  if (evt.key === "Escape") {
    popupList.forEach((listElement) => {
      if (listElement.classList.contains("popup_opened")) {
        listElement.classList.remove("popup_opened");
        document.removeEventListener("keydown", listenerEscKeyDown);
      }
    });
  }
}

// Функция добавляет или удаляет класс у элемента
function togglePopup(elName, className) {
  elName.classList.toggle(className);
}

// Функция устанавливает слушатели на кнопку закрытия попапа, оверлей попапа
const setListenersSwitchForPopup = () => {
  // установить слушатели на каждом элементе массива
  popupList.forEach((listElement) => {
    const popupCloseButton = listElement.querySelector(".popup__close");

    document.addEventListener("keydown", listenerEscKeyDown);

    popupCloseButton.addEventListener("click", (evt) => {
      togglePopup(evt.target.closest(".popup"), "popup_opened");
    });

    listElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        togglePopup(evt.currentTarget, "popup_opened");
      }
    });
  });
};

// При нажатии на кнопку редактировать открыть форму редактирования профиля
editProfileButton.addEventListener("click", () => {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  togglePopup(popup, "popup_opened");
});

// При нажатии на кнопку сохранить в форме редактирования профиля сохранить значения и закрыть форму
editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  togglePopup(popup, "popup_opened");
});

// Вызов функции, которая ищет все попапы, и навешивает слушатели
setListenersSwitchForPopup();

// Создание карточек на основе исходного массива
initialCards.forEach((item) => {

  const card = new Card(item.name, item.link);

  const cardElement = card.generateCard();

  document.querySelector(".elements__list").prepend(cardElement);
});

// Добавление карточек
addNewPlaceForm.addEventListener("submit", () => {
  const newCard = new Card(placeName.value, placeLink.value);
  const newCardElement = newCard.generateCard();
  document.querySelector(".elements__list").prepend(newCardElement);
});

// Проверка на валидность формы
formList.forEach((form) => {
  const formValid = new FormValidation(validationConfig, form);

  const fElement = formValid.enableValidation();
});