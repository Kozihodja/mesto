export class Section { 
    constructor ( { renderer }, containerSelector ) {  
        this._renderer = renderer; 
        this._container = document.querySelector(containerSelector); 
    } 
 
    renderItems(data) { 
        this._initialArray = data;
        this._initialArray.forEach((item) => { 
            this._renderer(item); 
        });
    } 
 
    addItem(element) { 
        this._container.prepend(element); 
    } 
} 