import { Popup } from './Popup.js'; 
 
export class PopupConfirmation extends Popup { 
    constructor({ popupSelector, handleFormSubmit }) { 
        super(popupSelector); 
        this._handleFormSubmit = handleFormSubmit; 
        this._form = this._popup.querySelector(".form")
        this._inputList = this._popup.querySelectorAll(".form__input"); 
        this._id = '';
        this._element = '';
    } 
 
    setEventListeners() { 
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => { 
            evt.preventDefault(); 
            this._handleFormSubmit(this._id, this._element); 
            this.close(); 
          })    
    } 

    open(id, element) {
        super.open()
        this._id = id;
        this._element = element;
    }
 
    close() { 
        super.close(); 
        this._form.reset();
    } 
} 