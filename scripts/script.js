const editProfileButton = document.querySelector(".profile__edit-button");

const popupList = Array.from(document.querySelectorAll(".popup"));

const popup = document.querySelector(".popup-edit");
const editProfileForm = popup.querySelector(".form");
const nameInput = editProfileForm.querySelector(".form__input_name");
const jobInput = editProfileForm.querySelector(".form__input_job");
const name = document.querySelector(".profile__name");
const job = document.querySelector(".profile__job");

export const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

export const validationConfig  = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_inactive',
  inputErrorClass: 'form__input_type_error', 
  errorClass: 'form__input-error_active"',
};


function listenerEscKeyDown(evt) {
  if (evt.key === "Escape") {
    popupList.forEach((listElement) => {
      if (listElement.classList.contains("popup_opened")) {
        listElement.classList.remove("popup_opened");
      }
    });
  }
}

// Функция добавляет или удаляет класс у элемента
function togglePopup(elName, className) {
  elName.classList.toggle(className);

  //   если добавить класс(открыть попап), то добавить слушатель нажатия на кнопку esc
  if (elName.classList.contains(className)) {
    document.addEventListener("keydown", listenerEscKeyDown);
  }
  //   если удалить класс(закрыть попап), то удалить слушатель с конпки esc
  else {
    document.removeEventListener("keydown", listenerEscKeyDown);
  }
}

// Функция устанавливает слушатели на кнопки закрытия попапа и оверлей попапа
const setListenersSwitchForPopup = () => {
  // установить слушатели на каждом элементе массива
  popupList.forEach((listElement) => {
    const popupCloseButton = listElement.querySelector(".popup__close");

    popupCloseButton.addEventListener("click", (evt) => {
      togglePopup(evt.target.closest(".popup"), "popup_opened");
    });

    listElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup")) {
        togglePopup(evt.currentTarget, "popup_opened");
      }
    });
  });
};

// При нажатии на кнопку редактировать открыть форму редактирования профиля
editProfileButton.addEventListener("click", () => {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  togglePopup(popup, "popup_opened");
});

// При нажатии на кнопку сохранить в форме редактирования профиля сохранить значения и закрыть форму
editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  togglePopup(popup, "popup_opened");
});

// При нажатии на кнопку добавить - открыть форму добавления новой карточки
addNewPlaceButton.addEventListener("click", () =>
  togglePopup(popupAdd, "popup_opened")
);
// Вызов функции, которая ищет все попапы, и навешивает слушатели
// на события нажатия оверлея и кнопки закрыть
setListenersSwitchForPopup();