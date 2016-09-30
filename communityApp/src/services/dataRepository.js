import {eventsData} from "services/eventsData";
import {jobsData, states, jobTypes, jobSkills} from "services/jobsData";
import moment from "moment";
// import {log} from "log";

function filterAndFormat(pastOrFuture, events) {
    var results = JSON.parse(JSON.stringify(events));
    if (pastOrFuture === "past") {
        results = results.filter(item => moment(item.dateTime) < moment());
    }
    else if (pastOrFuture === "future") {
        results = results.filter(item => moment(item.dateTime) > moment());
    }

    results.forEach(item => {
        var dateTime = moment(item.dateTime)
            .format("MM/DD/YYYY HH:mm");
        item.dateTime = dateTime;
    });

    return results;
}

export class DataRepository {
    getEvents(pastOrFuture) {
        var promise = new Promise((resolve) => {
            if (!this.events) {
                setTimeout(_ => {
                    this.events = eventsData.sort((a, b) => a.dateTime >= b.dateTime ? 1 : -1);
                    resolve(filterAndFormat(pastOrFuture, this.events));
                }, 100);
            }
            else {
                resolve(filterAndFormat(pastOrFuture, this.events));
            }
        });
        return promise;
    }

    getEvent(eventId) {
        return this.events.find(item => item.id === eventId);
    }

    getJobs() {
        var promise = new Promise((resolve) => {
            if (!this.jobsData) {
                this.jobsData = jobsData;
            }
            resolve(this.jobsData);
        });
        return promise;
    }

    getStates() {
        var promise = new Promise((resolve) => {
            if (!this.states) {
                this.states = states;
            }
            resolve(this.states);
        });
        return promise;
    }

    getJobTypes() {
        var promise = new Promise((resolve) => {
            if (!this.jobTypes) {
                this.jobTypes = jobTypes;
            }
            resolve(this.jobTypes);
        });
        return promise;
    }

    getJobSkills() {
        var promise = new Promise((resolve) => {
            if (!this.jobSkills) {
                this.jobSkills = jobSkills;
            }
            resolve(this.jobSkills);
        });
        return promise;
    }
}
