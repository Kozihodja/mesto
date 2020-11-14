export class UserInfo {
    constructor ( userNameSelector, userInfoSelector, userAvatarSelector ) {
        this._name = document.querySelector(userNameSelector);
        this._info = document.querySelector(userInfoSelector);
        this._avatar = document.querySelector(userAvatarSelector);

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

    setUserAvatar(url) {
        this._avatar.src = url;
    }
}