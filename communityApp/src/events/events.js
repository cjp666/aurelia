import {inject} from "aurelia-framework";
import {DataRepository} from "services/dataRepository";

@inject(DataRepository)
export class Events {
    constructor(dataRepository) {
        dataRepository.getEvents().then(events => this.events = events);
    }
}
