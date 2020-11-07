export class UserInfo {
    constructor ( userNameSelector, userInfoSelector ) {
        this._name = document.querySelector(userNameSelector);
        this._info = document.querySelector(userInfoSelector);

    }

    getUserInfo(nameInput, jobInput, userName, userJob) {
        nameInput.value = userName;
        jobInput.value = userJob;
    }

    setUserInfo(userName, userJob) {
        this._name.textContent = userName;
        this._info.textContent = userJob;
    }
}