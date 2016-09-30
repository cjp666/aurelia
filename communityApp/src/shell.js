import {log} from "log";

export class Shell {
    configureRouter(config, router) {
        this.router = router;

        config.title = "Chirs's community group";

        config.options.pushState = true;

        config.addPipelineStep("authorize", LogNextStep);
        config.addPipelineStep("preActivate", LogNextStep);
        config.addPipelineStep("preRender", LogNextStep);
        config.addPipelineStep("postRender", LogNextStep);

        config.map([
            { route: ["", "events", "abc"], viewPorts: { mainContent: { moduleId: "events/events" }, sideBar: { moduleId: "sideBar/sponsors" } }, name: "Events", title: "Events", nav: true },
            { route: "jobs", viewPorts: { mainContent: { moduleId: "jobs/jobs" }, sideBar: { moduleId: "sideBar/sponsors" } }, title: "Jobs", nav: true },
            { route: "discussion", viewPorts: { mainContent: { moduleId: "discussion/discussion" }, sideBar: { moduleId: "sideBar/ads" } } , title: "Discussion", nav: true },
            { route: "eventDetail/:eventId", viewPorts: { mainContent: { moduleId: "events/eventDetail" }, sideBar: { moduleId: "sideBar/ads" } }, name: "eventDetail" }
        ]);
    }
}

class LogNextStep {
    run(navigationInstruction, next) {
        return next().then(result => {
            log.debug(JSON.stringify(result));
            return result;
        });
    }
}
