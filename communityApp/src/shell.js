export class Shell {
    configureRouter(config, router) {
        this.router = router;

        config.title = "Chirs's community group";

        config.map([
            { route: ["", "events", "abc"], moduleId: "events/events", name: "Events", title: "Events", nav: true },
            { route: "jobs", moduleId: "jobs/jobs", title: "Jobs", nav: true },
            { route: "discussion", moduleId: "discussion/discussion", title: "Discussion", nav: true },
            { route: "eventDetail/:eventId", moduleId: "events/eventDetail", name: "eventDetail" }
        ]);
    }
}
