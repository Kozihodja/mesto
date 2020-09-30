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

const expand = document.querySelector('.expand');
const closePopurImgButton = expand.querySelector('.expand__close');

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
    const likeButton = el.querySelector('.element__like-button');
    likeButton.addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-icon_liked');
    });
}

// Обработчик события нажатия иконки удалить
function handlerDeleteButton(el) {
    const deleteButton = el.querySelector('.element__delete-icon');
    deleteButton.addEventListener('click', function (evt) {
        evt.target.parentNode.remove();
    });
}

function hendlerImgCliked(el) {
    const img = el.querySelector('.element__img');
    img.addEventListener('click', function (evt) {
        const card = evt.target.parentNode;

        const expand = document.querySelector('.expand');
        const expandImg = expand.querySelector('.expand__img');
        const expandTitle = expand.querySelector('.expand__title');
        const expandImgAlt = expand.querySelector('.expand__img');

        const cardImg = card.querySelector('.element__img');
        const cardTitle = card.querySelector('.element__title');
        const cardImgAlt = card.querySelector('.element__img');

        expandImg.src = cardImg.src;
        expandTitle.textContent = cardTitle.textContent;
        expandImgAlt.alt = cardImgAlt.textContent;

        expand.classList.toggle('expand_opened');
    });
}

// Функция добавляет или удаляет класс у элемента
function togglePopup(elName, className) {
    elName.classList.toggle(className);
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
// Функция выводит на экран карточки
function showNewCard (title, src) {
    const cardSection = document.querySelector('.elements__list');
    const result = createNewCard(title, src);
    cardSection.prepend(result);
}

// Цикл выводит на экран содержание массива initialCards
initialCards.forEach( function(card) {
    showNewCard(card.name, card.link);
    }
);

// Функция добавляет карточку на страницу
function addNewCard (evt) {
    evt.preventDefault();

    const placeName = popupAdd.querySelector('.popup__name').value;
    const placeLink = popupAdd.querySelector('.popup__job').value;

    showNewCard(placeName, placeLink);

    togglePopup(popupAdd, 'popup_opened');
}

// Открытие формы редактирования профиля
editButton.addEventListener('click', () => {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    togglePopup(popup, 'popup_opened');
}
);
// Закрытие формы редактирования профиля
popupClose.addEventListener('click', () => togglePopup(popup, 'popup_opened'));
// Сохранение введеных данных в форме профиля
formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    togglePopup(popup, 'popup_opened');
});
// Открытие формы добавления новой карточки
addButton.addEventListener('click', () => togglePopup(popupAdd, 'popup_opened'));
// Закрытие формы добавления новой карточки
closeAddForm.addEventListener('click', () => togglePopup(popupAdd, 'popup_opened'));
// Добавление новой карточки
placeAddForm.addEventListener('submit', addNewCard);
// Закрытие показа фотографий
closePopurImgButton.addEventListener('click', () => togglePopup(expand, 'expand_opened'));