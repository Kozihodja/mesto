import { editProfileForm, addCardForm, popupChengeAvatarForm, editProfileButton, addNewPlaceButton, nameInput, jobInput, editAvatarBtn, validationConfig } from '../utils/data.js'; 
import { PopupWithForm } from '../components/PopupWithForm.js'; 
import { FormValidation } from '../components/FormValidation.js'; 
import { UserInfo } from '../components/UserInfo.js';
import { userProfile, api, popupShowCard, popupDeleteCard, displayCards, createNewCard, renderLoading } from '../utils/utils.js'; 
 
import './index.css';

const user = new UserInfo(".profile__name", ".profile__job", ".profile__avatar");

Promise.all([
  api.getUserInfo(), 
  api.getInitialCards()
])
  .then(([userInfo, cards]) => {
    // userProfileInfo.setUserInfo(userInfo)
    // При успешном выполнении запроса вызывать метод класса user, 
    // который устанавливает данные пользователя в разметку
    user.setUserInfo(userInfo.name, userInfo.about);
    // Вызывать метод класса user, который установит аватар пользователя
    user.setUserAvatar(userInfo.avatar);
    // Запишет полученные данные в объет userProfile
    userProfile._id = userInfo._id;

    displayCards(cards);
    console.log(1);
  })
  .catch((err) => {
    console.log(`При загрузке исходных данных возникла ошибка: ${err}`);
  }); 

// Установить слушатели на попуп для показа изображений
popupShowCard.setEventListeners();
// Установить слушатели на попуп потверждения удаления
popupDeleteCard.setEventListeners();

// Экземпляр классов валидации форм(редактирования профиля, добавления карточки и изменение аватара)
const editProfileFormValid = new FormValidation(validationConfig, editProfileForm);
const addCardFormValid = new FormValidation(validationConfig, addCardForm);
const changeAvatarFormValid = new FormValidation(validationConfig, popupChengeAvatarForm);
// Установить слушатели для валидации форм
changeAvatarFormValid.enableValidation();
editProfileFormValid.enableValidation();
addCardFormValid.enableValidation();
// Экземпляр формы добавления новой карточки
const popupAdd = new PopupWithForm({ 
  popupSelector: ".popup-add", 
  handleFormSubmit: (list, form) => {
    // При Сабмите формы получает объект со значениями полей формы и саму форму.
    // При сабмите изменяет текстконтент на кнопке сабмита
    renderLoading(true, form);
    // служит для определения владельца карточки, так как идет процесс создания карточки,
    // то значение тру
    const owner = true;
    // Отправляет запрос на сервер со значениями полей
    api.addNewCard(list)
    // В случае успешного запроса, отобразить новую карточку на странице 
      .then(function(result) {
        createNewCard(result, owner);
        popupAdd.close();
     })
    //  В случае ошибки, вывести в консоль ошибку
     .catch(function(error) {
       console.log(`При создании карточки возникла ошибка ${error}`);
     })
    //  В конце изменить текстконтент на кнопке сабмита
     .finally(() => {
      renderLoading(false, form);
    });
  } 
});

// Экземпляр формы редактирования профиля
const popupEdit = new PopupWithForm({ 
  popupSelector: ".popup-edit", 
  handleFormSubmit: (list, form) => {
    renderLoading(true, form);
    api.setUserInfo(list.userName, list.userJob)
    .then(function(data) {
      user.setUserInfo(list.userName, list.userJob);
      popupEdit.close();
   })
   .catch(function(error) {
     console.log(`При редактировании профиля возникла ошибка ${error}`);
   })
   .finally(() => {
    renderLoading(false, form);
  });
  } 
}); 

// Экземпляр формы редактирования аватара
const popupChengeAvatar = new PopupWithForm({ 
  popupSelector: ".popup-change-avatar", 
  handleFormSubmit: (list, form) => {
    renderLoading(true, form);
    api.changeUserAvatar(list)
      .then(function(data) {
        user.setUserAvatar(list.link);
        popupChengeAvatar.close();
     })
     .catch(function(error) {
       console.log(`Не удалось обновить аватар. Ошибка: ${error}`);
     })
     .finally(() => {
      renderLoading(false, form);
    });
  } 
});
popupChengeAvatar.setEventListeners();
// При нажатии на кнопку изменения аватара, открыть форму редактирования изменения аватара
editAvatarBtn.addEventListener("click", () =>  
{ 
  popupChengeAvatar.open();
  changeAvatarFormValid.disabledSubmitButton();
}
);

// При нажатии на кнопку добавить - открыть форму добавления новой карточки  
addNewPlaceButton.addEventListener("click", () =>  
  { 
    popupAdd.open();
    addCardFormValid.disabledSubmitButton();    
  } 
);
popupAdd.setEventListeners();
// При нажатии на кнопку редактирования профиля открыть форму редактирования профиля
editProfileButton.addEventListener("click", () =>  
  {  
    const userInfo = user.getUserInfo();
    nameInput.value = userInfo.userName;
    jobInput.value = userInfo.userJob;
    popupEdit.open();   
  } 
);
popupEdit.setEventListeners();