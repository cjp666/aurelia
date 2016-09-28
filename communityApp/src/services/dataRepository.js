import {eventsData} from "services/eventsData";
import moment from "moment";
import {log} from "log";

export class DataRepository {
    constructor() {
        this.events = null;
    }

    getEvents() {
        var promise = new Promise((resolve) => {
            if (!this.events) {
                log.info("retrieving events data");
                this.events = eventsData;
                this.events.forEach(item => {
                    var dateTime = moment(item.dateTime)
                        .format("DD/MM/YYYY HH:mm");
                    item.dateTime = dateTime;
                });
                resolve(this.events);
            }
            else {
                log.info("using cache for events data");
                resolve(this.events);
            }
        });
        return promise;
    }

    getEvent(eventId) {
        return this.events.find(item => item.id === eventId);
    }
}
