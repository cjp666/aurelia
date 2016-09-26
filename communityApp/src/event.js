import {inject} from 'aurelia-framework';
// import {DataCache} from "DataCache";

@inject("Cache")
export class Event {
    constructor(cache) {
        cache.data.push('b');
    }

    activate(bindingContext) {
        this.item = bindingContext;
    }
}
