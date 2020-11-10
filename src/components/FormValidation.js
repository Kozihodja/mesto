export class FormValidation  { 
  constructor(validationConfig) { 
      this._validationConfig = validationConfig; 
      // this._form = form; 
      this._submitButton = this._validationConfig.submitButtonSelector; 
      this._input = this._validationConfig.inputSelector 
      this._inputError = this._validationConfig.inputErrorClass; 
      this._errorClass = this._validationConfig.errorClass; 
      this._inactiveButtonClass = this._validationConfig.inactiveButtonClass; 
 
  } 
   
  enableValidation(form) {
    this._form = form;  
      // this._form.addEventListener("submit", (evt) => { 
      //     evt.preventDefault(); 
      //   }); 
        this._setEventListeners(this._form); 
  } 

  _showInputError(formElement, inputElement, errorMessage) { 
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`); 
     
      inputElement.classList.add(this._inputError); 
      errorElement.textContent = errorMessage; 
      errorElement.classList.add(this._errorClass); 
  }; 
    // Функция удаляет класс с ошибкой для input и span 
  _hideInputError(formElement, inputElement) { 
      const errorElement = formElement.querySelector(`#${inputElement.id}-error`); 
     
      inputElement.classList.remove(this._inputError); 
      errorElement.classList.remove(this._errorClass); 
      errorElement.textContent = ""; 
  }; 
     
    // Функция проверки валидности поля 
  _InputisValid(formElement, inputElement) { 
      if (!inputElement.validity.valid) { 
        this._showInputError(formElement, inputElement, inputElement.validationMessage); 
      } else { 
        this._hideInputError(formElement, inputElement); 
      } 
  }; 
     
  _hasInvalidInput(inputList) { 
      return inputList.some((inputElement) => { 
        return !inputElement.validity.valid; 
      }); 
  }; 
     
  _toggleButtonState(inputList, buttonElement) { 
      if (this._hasInvalidInput(inputList)) { 
        buttonElement.classList.add(this._inactiveButtonClass); 
        buttonElement.disabled = true; 
      } else { 
        buttonElement.classList.remove(this._inactiveButtonClass); 
        buttonElement.disabled = false; 
      } 
  }; 
     
    // Фунция ищет все поля в форме 
  _setEventListeners(formElement) { 
      this._inputList = Array.from(formElement.querySelectorAll(this._input)); 
      this._buttonElement = formElement.querySelector(this._submitButton); 
     
      this._toggleButtonState(this._inputList, this._buttonElement); 
     
      this._inputList.forEach((inputElement) => { 
        inputElement.addEventListener("input", () => { 
          this._InputisValid(formElement, inputElement); 
          this._toggleButtonState(this._inputList, this._buttonElement); 
        }); 
      }); 
}; 
}