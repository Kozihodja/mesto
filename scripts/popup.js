import { popupList } from './data.js';

  class Popup {
      constructor (name, popup, openButton) {
          this._name = name;
          this._popup = popup;
          this._openButton = openButton;
      }

      setEventListeners() {

        this._popup.querySelector('.popup__close').addEventListener("click", () => {
            this._handleClosePopup();
        });

        this._popup.addEventListener("click", (evt) => {
            if (evt.target.classList.contains("popup")) {
                this._handleClosePopup();
            }
          });

        document.addEventListener('keydown', (evt) => {
            if (evt.key === "Escape") {
                this._handleClosePopup();
                console.log(1);
            }
        });

        this._openButton.addEventListener("click", () => {
            this._popup.classList.add('popup_opened');
        });
      }

      _handleClosePopup() {
        this._popup.classList.remove('popup_opened');
      }

  }

popupList.forEach((item) => {

    const popup = new Popup(item.name, item.popup, item.openButton);

    const popupElement = popup.setEventListeners();

});