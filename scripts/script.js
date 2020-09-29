const editButton = document.querySelector('.profile__edit-button');

const popup = document.querySelector('.popup-edit');
const popupClose = popup.querySelector('.popup__close');
const formElement = popup.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__name');
const jobInput = formElement.querySelector('.popup__job');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__job');

const popupAdd = document.querySelector('.popup-add');
const addButton = document.querySelector('.profile__add-button');
const closeAddForm = popupAdd.querySelector('.popup__close');
const addElement = popupAdd.querySelector('.popup__save');
const placeAddForm = popupAdd.querySelector('.popup__form');

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

// Обработчик события нажатия на кнопку лайк
function handlerLikeButton(el) {
    el.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-icon_liked');
    });
}

// Обработчик события нажатия иконки удалить
function handlerDeleteButton(el) {
    el.querySelector('.element__delete-icon').addEventListener('click', function (evt) {
        evt.target.parentNode.remove();
    });
}

function hendlerImgCliked(el) {
    const img = el.querySelector('.element__img');
    img.addEventListener('click', function (evt) {
        const card = evt.target.parentNode;

        const expand = document.querySelector('.expand');
        expand.classList.toggle('expand_opened');
        expand.querySelector('.expand__img').src = card.querySelector('.element__img').src;
        expand.querySelector('.expand__title').textContent = card.querySelector('.element__title').textContent;
        expand.querySelector('.expand__img').alt = card.querySelector('.element__img').textContent;
    });
}

// Функция добавляет или удаляет класс popup_opened у элемента
function controlPopup(el) {
    el.classList.toggle('popup_opened');
}

// Функция создает новую карточку
function createNewCard(title, src) {

    const newCardTemplate = document.querySelector('#element').content;
    const cardSection = document.querySelector('.elements__list');
    const element = newCardTemplate.cloneNode(true);

    element.querySelector('.element__img').src = src;
    element.querySelector('.element__title').textContent = title;
    element.querySelector('.element__img').alt = title;

    handlerLikeButton(element);
    handlerDeleteButton(element);
    hendlerImgCliked(element);

    cardSection.prepend(element);
}

// Цикл выводит на экран содержание массива initialCards
initialCards.forEach( function(card, i, arr) {
    createNewCard(card.name, card.link);
    }
);

// Функция добавляет карточку на страницу
function addNewCard (evt) {
    evt.preventDefault();

    const placeName = popupAdd.querySelector('.popup__name').value;
    const placeLink = popupAdd.querySelector('.popup__job').value;

    createNewCard(placeName, placeLink);

    controlPopup(popupAdd);
}

// Открытие формы редактирования профиля
editButton.addEventListener('click', () => {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    controlPopup(popup);
}
);
// Закрытие формы редактирования профиля
popupClose.addEventListener('click', () => controlPopup(popup));
// Сохранение введеных данных в форме профиля
formElement.addEventListener('submit', (evt) => { 
    evt.preventDefault(); 
    name.textContent = nameInput.value; 
    job.textContent = jobInput.value; 
    controlPopup(popup);
});
// Открытие формы добавления новой карточки
addButton.addEventListener('click', () => controlPopup(popupAdd));
// Закрытие формы добавления новой карточки
closeAddForm.addEventListener('click', () => controlPopup(popupAdd));
// Добавление новой карточки
placeAddForm.addEventListener('submit', addNewCard);
// Закрытие показа фотографий
const closePopurImg = document.querySelector('.expand__close');
closePopurImg.addEventListener('click', () => {document.querySelector('.expand').classList.toggle('expand_opened')});