import {inject, Lazy, All} from 'aurelia-framework';
import {ImLazy} from "ImLazy";
import {log} from "log";
// import {DataCache} from "DataCache";

@inject("Cache", Lazy.of(ImLazy), All.of("SuperPlugIn"))
export class Events {
    constructor(dataCache, lazyOfImLazy, plugins) {
        this.events = [
            { id: 1, title: "Aurelia Fundamentals" },
            { id: 2, title: "Data-Centric SPAs with BreezeJS" }
        ];
        this.cache = dataCache;
        this.cache.data.push('a');
        this.lazyOfImLazy = lazyOfImLazy;

        plugins.forEach(function (plugin) {
            plugin.doPlugInStuff();
        });
    }

    createAndUseLazy() {
        log.info("about to use lazy");
        this.lazyOfImLazy().doStuff();
    }
}
