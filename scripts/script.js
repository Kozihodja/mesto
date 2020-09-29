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

// Функция поставить убрать лайк
function liked(el) {
    el.querySelector('.element__like-button').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like-icon_liked');
    });
}

// Функция удаления карточки
function remove(el) {
    el.querySelector('.element__delete-icon').addEventListener('click', function (evt) {
        evt.target.parentNode.remove();
    });
}

function openPopupImg(el) {
    el.querySelector('.element__img').addEventListener('click', function (evt) {
        const card = evt.target.parentNode;

        const expand = document.querySelector('.expand');
        console.log(expand);
        expand.classList.toggle('expand_opened');
        expand.querySelector('.expand__img').src = card.querySelector('.element__img').src;
        expand.querySelector('.expand__title').textContent = card.querySelector('.element__title').textContent;
        expand.querySelector('.expand__img').alt = card.querySelector('.element__img').textContent;
    });
}
// Функция добавления новой карточки
function newCard (evt) {
    evt.preventDefault();

    const newCardTemplate = document.querySelector('#element').content;
    const cardSection = document.querySelector('.elements__list');
    const newElement = newCardTemplate.cloneNode(true);

    newElement.querySelector('.element__img').src = placeAddForm.querySelector('.popup__job').value;
    newElement.querySelector('.element__title').textContent = placeAddForm.querySelector('.popup__name').value;
    newElement.querySelector('.element__img').alt = placeAddForm.querySelector('.popup__name').value;

    liked(newElement);
    remove(newElement);
    openPopupImg(newElement);
    popupAdd.classList.toggle('popup_opened'); 
    cardSection.prepend(newElement);
}

// Цикл выводит на экран содержание массива initialCards
initialCards.forEach( function(card, i, arr) {
    const cardTemplate = document.querySelector('#element').content;
    const elementsSection = document.querySelector('.elements__list');
    const element = cardTemplate.cloneNode(true);

    element.querySelector('.element__img').src = card.link;
    element.querySelector('.element__title').textContent = card.name;
    element.querySelector('.element__img').alt = card.name;

    liked(element);
    remove(element);
    openPopupImg(element);
    elementsSection.append(element);
    }
);
// Открытие формы редактирования профиля
editButton.addEventListener('click', () => {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
    popup.classList.toggle('popup_opened');
}
);
// Закрытие формы редактирования профиля
popupClose.addEventListener('click', () => {popup.classList.toggle('popup_opened')});
// Сохранение введеных данных в форме профиля
formElement.addEventListener('submit', (evt) => { 
    evt.preventDefault(); 
    name.textContent = nameInput.value; 
    job.textContent = jobInput.value; 
    popup.classList.toggle('popup_opened');
});
// Открытие формы добавления новой карточки
addButton.addEventListener('click', () => {popupAdd.classList.toggle('popup_opened')});
// Закрытие формы добавления новой карточки
closeAddForm.addEventListener('click', () => {popupAdd.classList.toggle('popup_opened')});
// Добавление новой карточки
placeAddForm.addEventListener('submit', newCard);

// const closePopurImg = document.querySelector('.expand__close');
// closePopurImg.addEventListener('click', () => {document.querySelector('.expand').classList.toggle('expand_opened')});