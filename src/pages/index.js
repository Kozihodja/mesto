import { editProfileForm, addCardForm, editProfileButton, addNewPlaceButton, nameInput, jobInput, name, job, initialCards, validationConfig } from '../utils/data.js'; 
import { PopupWithForm } from '../components/PopupWithForm.js'; 
import { FormValidation } from '../components/FormValidation.js'; 
import { UserInfo } from '../components/UserInfo.js'; 
import { displayCards, createNewCard } from '../utils/utils.js'; 
 
import './index.css'; 
// Отображение карточек на странице из изходного массива данных
displayCards(initialCards); 
// Экземпляр класса валидации формы
const editProfileFormValid = new FormValidation(validationConfig, editProfileForm);
const addCardFormValid = new FormValidation(validationConfig, addCardForm);

editProfileFormValid.enableValidation();
addCardFormValid.enableValidation();
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
    user.setUserInfo(list.userName, list.userJob); 
  } 
}); 
// При нажатии на кнопку добавить - открыть форму добавления новой карточки  
addNewPlaceButton.addEventListener("click", () =>  
  { 
    popupAdd.open();
    addCardFormValid.disabledSubmitButton();    
  } 
);

popupAdd.setEventListeners();
editProfileButton.addEventListener("click", () =>  
  {  
    user.getUserInfo(nameInput, jobInput, name.textContent, job.textContent);
    popupEdit.open();   
  } 
);
popupEdit.setEventListeners();