import { editProfileButton, addNewPlaceButton, nameInput, jobInput, name, job, initialCards, validationConfig } from '../utils/data.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { FormValidation } from '../components/FormValidation.js';
import { UserInfo } from '../components/UserInfo.js';
import { createCard, createNewCard } from '../utils/utils.js';

import './index.css';

const user = new UserInfo(".profile__name", ".profile__job");
const formValid = new FormValidation(validationConfig);

const popupAdd = new PopupWithForm({
  popupSelector: ".popup-add",
    handleFormSubmit: (list) => {
    createNewCard(list);
  }
});

const popupEdit = new PopupWithForm({
  popupSelector: ".popup-edit",
  handleFormSubmit: (list) => {
    user.getUserInfo(list.userName, list.userJob);
  }
});

createCard(initialCards);

// При нажатии на кнопку добавить - открыть форму добавления новой карточки 
addNewPlaceButton.addEventListener("click", () => 
  {
    formValid.enableValidation(popupAdd._popup.querySelector('.form'));
    popupAdd.open();
    popupAdd.setEventListeners();
  }
);

editProfileButton.addEventListener("click", () => 
  {
    user.setUserInfo(nameInput, jobInput, name.textContent, job.textContent);
    formValid.enableValidation(popupEdit._popup.querySelector('.form'));
    popupEdit.open();
    popupEdit.setEventListeners();
    this.close();
  }
);