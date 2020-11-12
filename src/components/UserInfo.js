export class UserInfo {
    constructor ( userNameSelector, userInfoSelector ) {
        this._name = document.querySelector(userNameSelector);
        this._info = document.querySelector(userInfoSelector);

    }

    setUserInfo(userName, userJob) {
        
        this._name.textContent = userName;
        this._info.textContent = userJob;
    }

    getUserInfo() {
        return {
            userName: this._name.textContent,
            userJob: this._info.textContent 
        }
    }
}