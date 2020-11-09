import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._nameSection = this._popup.querySelector(".expand__title");
        this._imgSection = this._popup.querySelector(".expand__img");
    }

    open(name, src) {
        super.open();

        this._name = name;
        this._src = src;

        this._nameSection.textContent = this._name;
        this._imgSection.src = this._src;
        this._imgSection.alt = this._name;
    }
}