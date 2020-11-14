export class Api {
    constructor( {baseUrl, headers} ) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _requestGet(url) {
        this._data = fetch(url, {
            mathod: "GET",
            headers: this._headers
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                  }
                return Promise.reject(`${res.status}. Не удалось сделать GET запрос по адресу ${url}`);
            })
        return this._data;
    }

    getInitialCards() {
        return this._requestGet(`${this._baseUrl}/cards`);
    }

    addNewCard(inputName, inputAbout){
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: inputName,
                link: inputAbout
            })
        }).then(res => {
            if (res.ok) {
                return res.json();
              }
            return Promise.reject(`${res.status}. Не удалось загрузить карточку`);
        })
    }

    addLike(id){
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this._headers,
            
        })
        .then(res => {
            if (res.ok) {
                return res.json();
              }
            return Promise.reject(`${res.status}. Не удалось загрузить карточку`);
        })
    }

    deleteLike(id){
        return fetch(`${this._baseUrl}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this._headers,
            
        })
        .then(res => {
            if (res.ok) {
                return res.json();
              }
            return Promise.reject(`${res.status}. Не удалось загрузить карточку`);
        })
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: this._headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
              }
            return Promise.reject(`${res.status}. Не удалось загрузить карточку`);
        })
    }

    getUserInfo() {
        return this._requestGet(`${this._baseUrl}/users/me`);
    }

    setUserInfo(inputName, inputAbout){
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: inputName,
                about: inputAbout
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
              }
            return Promise.reject(`${res.status}. Не удалось сделать GET запрос по адресу ${url}`);
        }) 
    }

    changeUserAvatar(data) {
       return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.link
            })
        })
        .then(res => {
            if (res.ok) {
                return res.json();
              }
            return Promise.reject(`${res.status}. Не удалось сделать GET запрос по адресу ${url}`);
        })
    }
}