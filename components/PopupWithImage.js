import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
    constructor(popupSelector, name, src) {
        super(popupSelector);
        this._name = name;
        this._src = src;
    }

    open() {
        super.open();

        this._popup.querySelector(".expand__title").textContent = this._name;
        this._popup.querySelector(".expand__img").src = this._src;
        this._popup.querySelector(".expand__img").alt = this._name;
    }
}