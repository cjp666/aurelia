## [Configuration and Startup](aurelia-doc://section/1/version/1.0.0)

<code-listing heading="Bootstrapping Older Browsers">
  <source-code lang="HTML">
    <script src="jspm_packages/system.js"></script>
    <script src="config.js"></script>
    <script>
      SystemJS.import('aurelia-polyfills').then(function() {
        return SystemJS.import('webcomponents/webcomponentsjs/MutationObserver');
      }).then(function() {
        SystemJS.import('aurelia-bootstrapper');
      });
    </script>
  </source-code>
</code-listing>

> Warning: Promises in Edge
> Currently, the Edge browser has a serious performance problem with its Promise implementation. This deficiency can greatly increase startup time of your app. If you are targeting the Edge browser, it is highly recommended that you use the [bluebird promise](http://bluebirdjs.com/docs/getting-started.html) library to replace Edge's native implementation. You can do this by simply referencing the library prior to loading system.js.

<code-listing heading="Standard Startup Configuration">
  <source-code lang="ES 2015/2016">
    export function configure(aurelia) {
      aurelia.use
        .standardConfiguration()
        .developmentLogging();

      aurelia.start().then(() => aurelia.setRoot());
    }
  </source-code>
  <source-code lang="TypeScript">
    import {Aurelia} from 'aurelia-framework';

    export function configure(aurelia: Aurelia): void {
      aurelia.use
        .standardConfiguration()
        .developmentLogging();

      aurelia.start().then(() => aurelia.setRoot());
    }
  </source-code>
</code-listing>

<code-listing heading="Explicit Startup Configuration">
  <source-code lang="ES 2015/2016">
    import {LogManager} from 'aurelia-framework';
    import {ConsoleAppender} from 'aurelia-logging-console';

    LogManager.addAppender(new ConsoleAppender());
    LogManager.setLevel(LogManager.logLevel.debug);

    export function configure(aurelia) {
      aurelia.use
        .defaultBindingLanguage()
        .defaultResources()
        .history()
        .router()
        .eventAggregator();

      aurelia.start().then(() => aurelia.setRoot('app', document.body));
    }
  </source-code>
  <source-code lang="TypeScript">
    import {LogManager, Aurelia} from 'aurelia-framework';
    import {ConsoleAppender} from 'aurelia-logging-console';

    LogManager.addAppender(new ConsoleAppender());
    LogManager.setLevel(LogManager.logLevel.debug);

    export function configure(aurelia: Aurelia): void {
      aurelia.use
        .defaultBindingLanguage()
        .defaultResources()
        .history()
        .router()
        .eventAggregator();

      aurelia.start().then(() => aurelia.setRoot('app', document.body));
    }
  </source-code>
</code-listing>

<code-listing heading="Configuring A Feature">
  <source-code lang="ES 2015/2016">
    export function configure(aurelia) {
      aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .feature('feature-name', featureConfiguration);

      aurelia.start().then(() => aurelia.setRoot());
    }
  </source-code>
  <source-code lang="TypeScript">
    import {Aurelia} from 'aurelia-framework';

    export function configure(aurelia: Aurelia): void {
      aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .feature('feature-name', featureConfiguration);

      aurelia.start().then(() => aurelia.setRoot());
    }
  </source-code>
</code-listing>

<code-listing heading="Installing a Plugin">
  <source-code lang="ES 2015/2016">
    export function configure(aurelia) {
      aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('plugin-name', pluginConfiguration);

      aurelia.start().then(() => aurelia.setRoot());
    }
  </source-code>
  <source-code lang="TypeScript">
    import {Aurelia} from 'aurelia-framework';

    export function configure(aurelia: Aurelia): void {
      aurelia.use
        .standardConfiguration()
        .developmentLogging()
        .plugin('plugin-name', pluginConfiguration);

      aurelia.start().then(() => aurelia.setRoot());
    }
  </source-code>
</code-listing>
