import { api } from "../utils/utils";

export class Card { 
    constructor(data, isOwnCard, userId, cardTemplate, handleCardClick, handleDeleteCard, hendleLikeClick) 
        { 
        this._name = data.name; 
        this.link = data.link; 
        this._own = isOwnCard;
        this._id = data._id;
        this._userId = userId;
        this._like = data.likes;
        this._cardTemplate = cardTemplate; 
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._hendleLikeClick = hendleLikeClick;
    } 
 
    _getTemplate() { 
 
        const cardElement = this._cardTemplate 
        .content 
        .querySelector('.element') 
        .cloneNode(true);
     
        return cardElement; 
    }
 
    generateCard() { 
        this._element = this._getTemplate();
        this._element.id = this._id;
        this._cardImg = this._element.querySelector('.element__img');
        this._deleteBtn =  this._element.querySelector('.element__delete-icon');
        this._likeCountElement =  this._element.querySelector('.element__like-count');
        this._likeCountElement.textContent = this._like.length;
        if (!this._own) {
            this._deleteBtn.classList.add('element__delete-icon_inactivate')
        }
        this._likeBtnState();
        this._setEventListeners(); 
        this._element.querySelector('.element__title').textContent = this._name; 
        this._cardImg .src = this.link; 
        this._cardImg .alt = 'На фотографии - ' + this._name; 
        return this._element; 
    } 
   
    _setEventListeners() { 
        this._element.querySelector('.element__like-button').addEventListener('click', () => { 
            this._hendleLikeClick(this._element, this._id); 
        }); 
        this._element.querySelector(".element__delete-icon").addEventListener("click", () => { 
            this._handleDeleteIconClick(); 
        }); 
        this._cardImg.addEventListener('click', () => { 

            this._handleCardClick(this._name, this.link); 
        }) 
      }

    _likeBtnState() {
        this._likeBtn =  this._element.querySelector('.element__like-icon');
        this._isUserLiked = this._like.some( (el) => {
               if (el._id === this._userId) {
                  return true;
               }
            });
        if (this._isUserLiked) {
            this._likeBtn.classList.add('element__like-icon_liked');
        }
    }
 
    _handleDeleteIconClick() { 
        this._handleDeleteCard(this._id, this._element);
    }
} 