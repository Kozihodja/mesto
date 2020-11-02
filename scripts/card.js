import { initialCards } from './data.js';

const expand = document.querySelector('.expand');

class Card {
    constructor(name, src) {
        this._name = name;
        this._src = src;
    }

    _getTemplate() {

        const cardElement = document
        .querySelector('#element')
        .content
        .querySelector('.element')
        .cloneNode(true);
    
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._setPopupEventListeners();

        this._element.querySelector('.element__title').textContent = this._name;
        this._element.querySelector('.element__img').src = this._src;

        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like-button').addEventListener('click', () => {
            this._handleLikeClick();
        });

        this._element.querySelector(".element__delete-icon").addEventListener("click", () => {
            this._element.remove();
        });

        this._element.querySelector('.element__img').addEventListener('click', () => {
            this._handleImgClick();
        });
      }

    _setPopupEventListeners() {
        expand.querySelector('.popup__close').addEventListener('click', () => {
            this._handleClosePopup();
        });

        expand.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("popup")) {
                this._handleClosePopup();
            }
          });

        document.addEventListener('keydown', (evt) => {
            if (evt.key === "Escape") {
                this._handleClosePopup();
            }
        });
    }
      
    _handleLikeClick() {
        this._element.querySelector('.element__like-icon').classList.toggle('element__like-icon_liked');
    }

    _handleImgClick() {

        expand.querySelector(".expand__img").src = this._src;
        expand.querySelector(".expand__title").textContent = this._name;

        expand.classList.add('popup_opened');
    }

    _handleClosePopup() {
        expand.classList.remove('popup_opened');
    }
}

initialCards.forEach((item) => {

    const card = new Card(item.name, item.link);

    const cardElement = card.generateCard();
  
    document.querySelector(".elements__list").prepend(cardElement);
  });