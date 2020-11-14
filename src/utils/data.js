export const editProfileButton = document.querySelector(".profile__edit-button");

export const addNewPlaceButton = document.querySelector(".profile__add-button");

const editPopup = document.querySelector(".popup-edit");
export const editProfileForm = editPopup.querySelector(".form-edit");
export const nameInput = editProfileForm.querySelector(".form__input_name");
export const jobInput = editProfileForm.querySelector(".form__input_job");
export const name = document.querySelector(".profile__name");
export const job = document.querySelector(".profile__job");

export const addCardForm = document.querySelector(".form-add");

export const cardTemplate = document.querySelector('#element');
export const cardListSection = '.elements__list';

export const popupChengeAvatarForm = document.querySelector(".form-change-avatar");
export const editAvatarBtn = document.querySelector('.profile__edit-avatar');

export let initialCards = [ ];

export const validationConfig  = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__submit',
    inactiveButtonClass: 'form__submit_inactive',
    inputErrorClass: 'form__input_type_error', 
    errorClass: 'form__input-error_active"',
  };