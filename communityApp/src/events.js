import {inject} from 'aurelia-framework';
// import {DataCache} from "DataCache";

@inject("Cache")
export class Events {
    constructor(dataCache) {
        this.events = [
            { id:1, title: "Aurelia Fundamentals" },
            { id:2, title: "Data-Centric SPAs with BreezeJS" }
        ];
        this.cache = dataCache;
        this.cache.data.push('a');
    }
}
