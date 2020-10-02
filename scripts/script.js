const editProfileButton = document.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup-edit');
const editProfileForm = popup.querySelector('.form');
const nameInput = editProfileForm.querySelector('.form__input_name');
const jobInput = editProfileForm.querySelector('.form__input_job');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');

const popupAdd = document.querySelector('.popup-add');
const addNewPlaceButton = document.querySelector('.profile__add-button');
const addNewPlaceForm = popupAdd.querySelector('.form');

const expand = document.querySelector('.expand');

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

// Функция добавляет или удаляет класс у элемента
function togglePopup(elName, className) {
    elName.classList.toggle(className);
}

// Обработчик события нажатия на кнопку лайк
function handlerLikeButton(el) {
    const likeButton = el.querySelector('.element__like-button');
    likeButton.addEventListener('click', function (evt) {
        const handlerElement = evt.currentTarget;
        const likeIcon = handlerElement.querySelector('.element__like-icon');
        togglePopup(likeIcon, 'element__like-icon_liked')
    });
}

// Обработчик события нажатия иконки удалить
function handlerDeleteButton(el) {
    const deleteButton = el.querySelector('.element__delete-icon');
    deleteButton.addEventListener('click', function (evt) {
        evt.target.parentNode.remove();
    });
}

// Обработчик события нажатия изображение карточки
function hendlerImgCliked(el) {
    const img = el.querySelector('.element__img');
    img.addEventListener('click', function (evt) {
        const card = evt.target.parentNode;

        const expandImg = expand.querySelector('.expand__img');
        const expandTitle = expand.querySelector('.expand__title');
        const expandImgAlt = expand.querySelector('.expand__img');

        const cardImg = card.querySelector('.element__img');
        const cardTitle = card.querySelector('.element__title');
        const cardImgAlt = card.querySelector('.element__img');

        expandImg.src = cardImg.src;
        expandTitle.textContent = cardTitle.textContent;
        expandImgAlt.alt = cardImgAlt.textContent;

        expand.classList.toggle('popup_opened');
    });
}

// Функция создает новую карточку
function createNewCard(title, src) {

    const newCardTemplate = document.querySelector('#element').content;
    const element = newCardTemplate.cloneNode(true);

    const elementImg =  element.querySelector('.element__img');
    const elementTitle = element.querySelector('.element__title');
    const elementImgAlt = element.querySelector('.element__img');

    elementImg.src = src;
    elementTitle.textContent = title;
    elementImgAlt.alt = `Фотография ${title}`;

    handlerLikeButton(element);
    handlerDeleteButton(element);
    hendlerImgCliked(element);

    return element;
}
// Функция выводит на экран карточки вначале дом элемента
function showNewCard (domEl, title, src) {
    const cardSection = document.querySelector(domEl);
    cardSection.prepend(createNewCard(title, src));
}

// Функция добавляет карточку на страницу
function addNewCard (evt) {
    evt.preventDefault();

    const placeName = popupAdd.querySelector('.form__input_name').value;
    const placeLink = popupAdd.querySelector('.form__input_job').value;

    showNewCard('.elements__list', placeName, placeLink);
    togglePopup(popupAdd, 'popup_opened');
}

// Функция устанавливает слушатели на кнопки закрытия попапа и оверлей попапа
const setListenersSwitchForPopup = (section, selectedClass, toggledClass) => { 
    // Записать все искомые элементы в массив List
    const list = Array.from(section.querySelectorAll('.'+ selectedClass));

    // установить слушатели на каждом элементе массива
    list.forEach((listElement) => {
        
        const popupCloseButton = listElement.querySelector('.popup__close');

        popupCloseButton.addEventListener('click', (evt) => {
            togglePopup(evt.target.closest('.'+selectedClass), toggledClass);
            
        })

        listElement.addEventListener('click', (evt) => {
            if (evt.target.classList.contains(selectedClass)) {
                togglePopup(evt.currentTarget, toggledClass)
            }
        });
    });
};

// Функция добавляет класс с ошибкой для input и span
const showInputError = (formElement, inputElement, errorMessage) => {

    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};
// Функция удаляет класс с ошибкой для input и span
const hideInputError = (formElement, inputElement) => {

    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
}; 
  
  // Функция проверки валидности поля
const InputisValid = (formElement, inputElement) => {

    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } 
    else {  
      hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    
    return inputList.some((inputElement) => {
         
      return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement) => {
    
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add('form__submit_inactive');
    } 
    else {
      buttonElement.classList.remove('form__submit_inactive');
    }
};

// Фунция ищет все поля в форме
const setEventListeners = (formElement) => {

    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__submit');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        InputisValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
};

//   Функция ищет все формы на странице
const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form'));

    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      setEventListeners(formElement);
    });
};

// Цикл выводит на экран содержание массива initialCards
initialCards.forEach( function(card) {
    showNewCard('.elements__list', card.name, card.link);
    }
);

// При нажатии на кнопку редактировать открыть форму редактирования профиля
editProfileButton.addEventListener('click', () => {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    togglePopup(popup, 'popup_opened');
}
);

// При нажатии на кнопку сохранить в форме редактирования профиля сохранить значения и закрыть форму
editProfileForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    togglePopup(popup, 'popup_opened');
});

// При нажатии на кнопку добавить - открыть форму добавления новой карточки
addNewPlaceButton.addEventListener('click', () => togglePopup(popupAdd, 'popup_opened'));
// При нажатии на кнопку сохранить, в форме добавления новой карточки, 
// добавит новую карточку и закрыть форму
addNewPlaceForm.addEventListener('submit', addNewCard);
// Вызов функции, которая ищет все попапы, и навешивает слушатели 
// на события нажатия оверлея и кнопки закрыть
setListenersSwitchForPopup(document, 'popup', 'popup_opened');
// Вызов функции, которая ищет все формы, и внутри этих форм навешивает 
// слушатели на события редактирования поля формы.
// В зависимости от валидности полей активирует или деактивирует кнопку submit и сообщение с ошибкой
enableValidation(); 