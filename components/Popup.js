export class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this._closeButton = this._popup.querySelector(".popup__close");
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener("keydown", (evt)=> {
            this._handleEscClose(evt);
        });
        this.setEventListeners();
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener("keydown", (evt)=> {
            this._handleEscClose(evt);
        });
    }

    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }

    setEventListeners() {
        this._closeButton.addEventListener("click", () => {
            this.close();
          });

        this._popup.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("popup")) {
                this.close();
            }
          });
    }

}