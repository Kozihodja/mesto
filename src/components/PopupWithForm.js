import { Popup } from './Popup.js'; 
 
export class PopupWithForm extends Popup { 
    constructor({ popupSelector, handleFormSubmit }) { 
        super(popupSelector); 
        this._handleFormSubmit = handleFormSubmit; 
        this._form = this._popup.querySelector(".form")
        this._inputList = this._popup.querySelectorAll(".form__input"); 
        this._values = {};  
    } 
 
    setEventListeners() { 
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => { 
            evt.preventDefault(); 
            this._handleFormSubmit(this._getInputValues(), this._form); 
          })    
    }
 
    _getInputValues() { 
        this._inputList.forEach((item) => { 
            this._values[item.name] = item.value; 
        }); 
 
        return this._values; 
    } 
 
    close() { 
        super.close(); 
        this._form.reset();
    } 
} 