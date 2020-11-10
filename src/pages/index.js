import { editProfileButton, addNewPlaceButton, nameInput, jobInput, name, job, formList, initialCards, validationConfig } from '../utils/data.js'; 
import { PopupWithForm } from '../components/PopupWithForm.js'; 
import { FormValidation } from '../components/FormValidation.js'; 
import { UserInfo } from '../components/UserInfo.js'; 
import { createCard, createNewCard } from '../utils/utils.js'; 
 
import './index.css'; 
// Отображение карточек на странице из изходного массива данных
createCard(initialCards); 
// Экземпляр класса валидации формы
const formValid = new FormValidation(validationConfig); 
// Экземпляр формы добавления новой карточки
const popupAdd = new PopupWithForm({ 
  popupSelector: ".popup-add", 
  handleFormSubmit: (list) => { 
    createNewCard({name: list.placeName, link: list.placeImg}); 
  } 
});
const user = new UserInfo(".profile__name", ".profile__job");
// Экземпляр формы редактирования профиля
const popupEdit = new PopupWithForm({ 
  popupSelector: ".popup-edit", 
  handleFormSubmit: (list) => {
    user.getUserInfo(list.userName, list.userJob); 
  } 
}); 
// При нажатии на кнопку добавить - открыть форму добавления новой карточки  
addNewPlaceButton.addEventListener("click", () =>  
  { 
    formValid.enableValidation(popupAdd._popup.querySelector('.form'));
    popupAdd.open();
    popupAdd.setEventListeners();
    
  } 
);
popupAdd.submit();
editProfileButton.addEventListener("click", () =>  
  {  
    user.setUserInfo(nameInput, jobInput, name.textContent, job.textContent); 
    formValid.enableValidation(popupEdit._popup.querySelector('.form'));
    popupEdit.open();
    popupEdit.setEventListeners();
    
  } 
);
popupEdit.submit();