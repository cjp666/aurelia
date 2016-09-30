import {inject} from "aurelia-framework";
import {Router, activationStrategy} from "aurelia-router";
import {DataRepository} from "services/dataRepository";
import {log} from "log";

@inject(DataRepository, Router)
export class EventsList {
    constructor(dataRepository, router) {
        this.dataRepository = dataRepository;
        this.router = router;
    }

    activate(params, routeConfig) {
        var pastOrFuture = routeConfig.name == '' ? 'future' : routeConfig.name;
        log.info("activate with " + pastOrFuture);

        return this.dataRepository.getEvents(pastOrFuture).then(events => {
            if (params.speaker || params.topic) {
                var filteredResults = [];
                events.forEach(item => {
                    if (params.speaker &&
                        item.speaker.toLowerCase()
                            .indexOf(params.speaker.toLowerCase()) >= 0) {
                        filteredResults.push(item);
                    }
                    if (params.topic &&
                        item.title.toLowerCase()
                            .indexOf(params.topic.toLowerCase()) >= 0) {
                        filteredResults.push(item);
                    }
                });
                this.events = filteredResults;
            }
            else {
                this.events = events;
            }
            this.events.forEach(item => item.detailUrl =
                this.router.generate('eventDetail', { eventId: item.id }));
        });
    }

    canActivate(){
        log.debug("canActivate");
        return true;
    }

    canDeactivate() {
        log.debug("canDeactivate");
        return true;
    }

    deactivate() {
        log.debug("deactivate");
    }

    determineActivationStrategy() {
        log.debug("determineActivationStrategy");
        return activationStrategy.invokeLifecycle;
    }
}
