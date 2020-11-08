import { editProfileButton, addNewPlaceButton, nameInput, jobInput, name, job, formList, initialCards, validationConfig } from '../utils/data.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { FormValidation } from '../components/FormValidation.js';
import { UserInfo } from '../components/UserInfo.js';
import { createCard } from '../utils/utils.js';

import './index.css';

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