let profile = document.querySelector('.profile');
let editButton = profile.querySelector('.profile__edit-button');

let name = profile.querySelector('.profile__name');
let job = profile.querySelector('.profile__job');

let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close');
let formElement = popup.querySelector('.popup__container');
let saveButton = formElement.querySelector('.popup__save');

let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__job');


function showPopup() { /*Функция отображает попап*/
    popup.classList.add('popup_opened');

    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

function closePopup() { /*Функция скрывает попап*/
   popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) { /*Функция редактирования Имени и профессии*/
    evt.preventDefault();

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;

    closePopup();
}


editButton.addEventListener('click', showPopup);
popupClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);