import { api, userProfile } from "../utils/utils";

export class Card { 
    constructor(data, isOwnCard, userProfile, cardTemplate, handleCardClick, handleDeleteCard) 
        { 
        this._name = data.name; 
        this.link = data.link; 
        this._own = isOwnCard;
        this._id = data._id;
        this._user = userProfile;
        this._like = data.likes;
        this._cardTemplate = cardTemplate; 
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
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
            this._handleLikeClick(); 
        }); 
        this._element.querySelector(".element__delete-icon").addEventListener("click", () => { 
            this._handleDeleteIconClick(); 
        }); 
        this._cardImg.addEventListener('click', () => { 

            this._handleCardClick(this._name, this.link); 
        }) 
      } 
 
    _handleLikeClick() {
        this._likeBtn =  this._element.querySelector('.element__like-icon');
        if (this._likeBtn.classList.contains('element__like-icon_liked')) {
            this._likeBtn.classList.remove('element__like-icon_liked');
            api.deleteLike(this._id)
            .then(result => {
                this._likeCountElement.textContent = result.likes.length;
              })
              .catch((err) => {
                console.log(`При удалении лайка возникла ошибка: ${err}`);
              });
        }
        else {
            this._likeBtn.classList.add('element__like-icon_liked');
            api.addLike(this._id)
            .then(result => {
                this._likeCountElement.textContent = result.likes.length;
              })
              .catch((err) => {
                console.log(`При добавлении лайка возникла ошибка: ${err}`);
              });    
        }
    }

    _likeBtnState() {
        this._likeBtn =  this._element.querySelector('.element__like-icon');
        this._isUserLiked = this._like.some( (el) => {
               if (el._id==userProfile._id) {
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