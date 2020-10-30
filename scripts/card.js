import { initialCards } from './data.js';

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

        document.querySelector('.popup__close-button').addEventListener('click', (evt) => {
            this._handleClosePopup();
          });

          document.querySelector('.expand').addEventListener('click', (evt) => {
              console.log(evt.currentTarget);
            // document.querySelector(evt.currentTarget).classList.remove('popup_opened');
            // this._handleClosePopup();
          });
      }
      
      _handleLikeClick() {
        this._element.querySelector('.element__like-icon').classList.toggle('element__like-icon_liked');
      }

      _handleImgClick() {

        document.querySelector(".expand__img").src = this._src;
        document.querySelector(".expand__title").textContent = this._name;

        document.querySelector(".expand").classList.add('popup_opened');
      }

      _handleClosePopup() {
        document.querySelector('.expand').classList.remove('popup_opened');
      }
}

initialCards.forEach((item) => {
    // Создадим экземпляр карточки
    const card = new Card(item.name, item.link);
    // Создаём карточку и возвращаем наружу
    const cardElement = card.generateCard();
  
    // Добавляем в DOM
    document.querySelector(".elements__list").prepend(cardElement);
  }); 