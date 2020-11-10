export class Card { 
    constructor(name, src, cardTemplate, handleCardClick) 
        { 
        this._name = name; 
        this._src = src; 
        this._cardTemplate = cardTemplate; 
        this._handleCardClick = handleCardClick; 
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
        this._cardImg = this._element.querySelector('.element__img') 
        this._setEventListeners(); 
        this._element.querySelector('.element__title').textContent = this._name; 
        this._cardImg .src = this._src; 
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

            this._handleCardClick(this._name, this._src); 
        }) 
      } 
 
    _handleLikeClick() { 
        this._element.querySelector('.element__like-icon').classList.toggle('element__like-icon_liked'); 
    } 
 
    _handleDeleteIconClick() { 
        this._element.remove();  

    } 
} 