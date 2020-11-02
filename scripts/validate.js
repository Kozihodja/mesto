import {validationConfig} from './data.js';

const formList = Array.from(document.querySelectorAll(".form"));

class FormValidation {
    constructor(validationConfig, form) {
        this._validationConfig = validationConfig;
        this._form = form
    }
    
    enableValidation() {
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();
          });
          this._setEventListeners(this._form);
    }

    _showInputError(formElement, inputElement, errorMessage) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      
        inputElement.classList.add(this._validationConfig.inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._validationConfig.errorClass);
    };
      // Функция удаляет класс с ошибкой для input и span
    _hideInputError(formElement, inputElement) {
        const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
      
        inputElement.classList.remove("form__input_type_error");
        errorElement.classList.remove("form__input-error_active");
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
          buttonElement.classList.add("form__submit_inactive");
          buttonElement.disabled = true;
        } else {
          buttonElement.classList.remove("form__submit_inactive");
          buttonElement.disabled = false;
        }
    };
      
      // Фунция ищет все поля в форме
    _setEventListeners(formElement) {
        this._inputList = Array.from(formElement.querySelectorAll(".form__input"));
        this._buttonElement = formElement.querySelector(".form__submit");
      
        this._toggleButtonState(this._inputList, this._buttonElement);
      
        this._inputList.forEach((inputElement) => {
          inputElement.addEventListener("input", () => {
            this._InputisValid(formElement, inputElement);
            this._toggleButtonState(this._inputList, this._buttonElement);
          });
        });
};
}

formList.forEach((form) => {
    const formValid = new FormValidation(validationConfig, form);

    const fElement = formValid.enableValidation();
});