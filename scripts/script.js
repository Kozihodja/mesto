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


function controlPopup() { /*Функция отображает попап*/
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;

    if (popup.classList.contains('popup_opened')) {
    	popup.classList.remove('popup_opened');
    }

    else {
    	popup.classList.add('popup_opened');
    }
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