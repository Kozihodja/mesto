let editButton = document.querySelector('.profile__edit-button');

let name = document.querySelector('.profile__name');
let job = document.querySelector('.profile__job');

let popup = document.querySelector('.popup');
let popupClose = popup.querySelector('.popup__close');
let formElement = popup.querySelector('.popup__form');

let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__job');

function controlPopup() { /*Функция отображает попап*/

    nameInput.value = name.textContent;
    jobInput.value = job.textContent;

    popup.classList.toggle('popup_opened')
    
}

function formSubmitHandler (evt) { /*Функция редактирования Имени и профессии*/
    evt.preventDefault();

    name.textContent = nameInput.value;
    job.textContent = jobInput.value;

    controlPopup();
}


editButton.addEventListener('click', controlPopup);
popupClose.addEventListener('click', controlPopup);
formElement.addEventListener('submit', formSubmitHandler);