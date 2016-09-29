import {inject} from "aurelia-framework";
import {Router} from "aurelia-router";
import {DataRepository} from "services/dataRepository";

@inject(DataRepository, Router)
export class Events {
    constructor(dataRepository, router) {
        dataRepository.getEvents().then(events => {
            this.events = events;
            this.events.forEach(item => item.detailUrl = router.generate("eventDetail", { eventId: item.id }));
        });
    }
}
