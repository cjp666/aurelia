import "bootstrap";
import {DataCache} from "DataCache";

export function configure(aurelia) {
    let cache = new DataCache();
    cache.data.push("1");
    cache.data.push("2");
    cache.data.push("3");

    aurelia.use.instance("Cache", cache);

    aurelia.use.standardConfiguration().developmentLogging();
    aurelia.start().then(a => a.setRoot("shell"));
}
