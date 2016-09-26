## [Routing](aurelia-doc://section/7/version/1.0.0)

<code-listing heading="Basic Route Configuration">
  <source-code lang="ES 2015/2016">
    export class App {
      configureRouter(config, router) {
        this.router = router;
        config.title = 'Aurelia';
        config.map([
          { route: ['', 'home'],       name: 'home',       moduleId: 'home/index' },
          { route: 'users',            name: 'users',      moduleId: 'users/index',   nav: true },
          { route: 'users/:id/detail', name: 'userDetail', moduleId: 'users/detail' },
          { route: 'files*path',       name: 'files',      moduleId: 'files/index',   href:'#files',   nav: true }
        ]);
      }
    }
  </source-code>
  <source-code lang="TypeScript">
    import {RouterConfiguration, Router} from 'aurelia-router';

    export class App {
      configureRouter(config: RouterConfiguration, router: Router): void {
        this.router = router;
        config.title = 'Aurelia';
        config.map([
          { route: ['', 'home'],       name: 'home',       moduleId: 'home/index' },
          { route: 'users',            name: 'users',      moduleId: 'users/index',   nav: true },
          { route: 'users/:id/detail', name: 'userDetail', moduleId: 'users/detail' },
          { route: 'files*path',       name: 'files',      moduleId: 'files/index',   href:'#files',   nav: true }
        ]);
      }
    }
  </source-code>
</code-listing>

### Route Pattern Options

* static routes
    - ie 'home' - Matches the string exactly.
* parameterized routes
    - ie  'users/:id/detail' - Matches the string and then parses an `id` parameter. Your view-model's `activate` callback will be called with an object that has an `id` property set to the value that was extracted from the url.
* wildcard routes
    - ie 'files*path' - Matches the string and then anything that follows it. Your view-model's `activate` callback will be called with an object that has a `path` property set to the wildcard's value.


### The Screen Activation Lifecycle

* `canActivate(params, routeConfig, navigationInstruction)` - Implement this hook if you want to control whether or not your view-model _can be navigated to_. Return a boolean value, a promise for a boolean value, or a navigation command.
* `activate(params, routeConfig, navigationInstruction)` - Implement this hook if you want to perform custom logic just before your view-model is displayed. You can optionally return a promise to tell the router to wait to bind and attach the view until after you finish your work.
* `canDeactivate()` - Implement this hook if you want to control whether or not the router _can navigate away_ from your view-model when moving to a new route. Return a boolean value, a promise for a boolean value, or a navigation command.
* `deactivate()` - Implement this hook if you want to perform custom logic when your view-model is being navigated away from. You can optionally return a promise to tell the router to wait until after you finish your work.

> Info: Navigation Commands
> A _Navigation Command_ is any object with a `navigate(router: Router)` method. When a navigation command is encountered, the current navigation will be cancelled and control will be passed to the navigation command so it can determine the correct action. Aurelia provides one navigation command out of the box: `Redirect`.

The `params` object will have a property for each parameter of the route that was parsed, as well as a property for each query string value. `routeConfig` will be the original route configuration object that you set up. `routeConfig` will also have a new `navModel` property, which can be used to change the document title for data loaded by your view-model. For example:

<code-listing heading="Route Params and NavModel">
  <source-code lang="ES 2016">
    import {autoinject} from 'aurelia-framework';
    import {UserService} from './user-service';

    @inject(UserService)
    export class UserEditScreen {
      constructor(userService) {
        this.userService = userService;
      }

      activate(params, routeConfig) {
        return this.userService.getUser(params.id)
          .then(user => {
            routeConfig.navModel.setTitle(user.name);
          });
      }
    }
  </source-code>
  <source-code lang="ES 2015">
    import {UserService} from './user-service';

    export class UserEditScreen {
      static inject() { return [UserService]; }

      constructor(userService) {
        this.userService = userService;
      }

      activate(params, routeConfig) {
        return this.userService.getUser(params.id)
          .then(user => {
            routeConfig.navModel.setTitle(user.name);
          });
      }
    }
  </source-code>
  <source-code lang="TypeScript">
    import {autoinject} from 'aurelia-framework';
    import {RouteConfig} from 'aurelia-router';
    import {UserService} from './user-service';

    @autoinject
    export class UserEditScreen {
      constructor(userService: UserService) { }

      activate(params: any, routeConfig: RouteConfig): Promise<any> {
        return this.userService.getUser(params.id)
          .then(user => {
            routeConfig.navModel.setTitle(user.name);
          });
      }
    }
  </source-code>
</code-listing>

<code-listing heading="Conventional Routing">
  <source-code lang="ES 2015/2016">
    export class App {
      configureRouter(config){
        config.mapUnknownRoutes(instruction => {
          //check instruction.fragment
          //return moduleId
        });
      }
    }
  </source-code>
  <source-code lang="TypeScript">
    import {RouterConfiguration} from 'aurelia-router';

    export class App {
      configureRouter(config: RouterConfiguration): void {
        config.mapUnknownRoutes(instruction => {
          //check instruction.fragment
          //return moduleId
        });
      }
    }
  </source-code>
</code-listing>

<code-listing heading="Customizing the Navigation Pipeline">
  <source-code lang="ES 2015/2016">
    import {Redirect} from 'aurelia-router';

    export class App {
      configureRouter(config) {
        config.title = 'Aurelia';
        config.addPipelineStep('authorize', AuthorizeStep);
        config.map([
          { route: ['welcome'],    name: 'welcome',       moduleId: 'welcome',      nav: true, title:'Welcome' },
          { route: 'flickr',       name: 'flickr',        moduleId: 'flickr',       nav: true, auth: true },
          { route: 'child-router', name: 'childRouter',   moduleId: 'child-router', nav: true, title:'Child Router' },
          { route: '', redirect: 'welcome' }
        ]);
      }
    }

    class AuthorizeStep {
      run(navigationInstruction, next) {
        if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {
          var isLoggedIn = /* insert magic here */false;
          if (!isLoggedIn) {
            return next.cancel(new Redirect('login'));
          }
        }

        return next();
      }
    }
  </source-code>
  <source-code lang="TypeScript">
    import {Redirect, NavigationInstruction, RouterConfiguration, Next} from 'aurelia-router';

    export class App {
      configureRouter(config: RouterConfiguration): void {
        config.title = 'Aurelia';
        config.addPipelineStep('authorize', AuthorizeStep);
        config.map([
          { route: ['welcome'],    name: 'welcome',       moduleId: 'welcome',      nav: true, title:'Welcome' },
          { route: 'flickr',       name: 'flickr',        moduleId: 'flickr',       nav: true, auth: true },
          { route: 'child-router', name: 'childRouter',   moduleId: 'child-router', nav: true, title:'Child Router' },
          { route: '', redirect: 'welcome' }
        ]);
      }
    }

    class AuthorizeStep {
      run(navigationInstruction: NavigationInstruction, next: Next): Promise<any> {
        if (navigationInstruction.getAllInstructions().some(i => i.config.auth)) {
          var isLoggedIn = /* insert magic here */false;
          if (!isLoggedIn) {
            return next.cancel(new Redirect('login'));
          }
        }

        return next();
      }
    }
  </source-code>
</code-listing>

### Configuring PushState

Add [a base tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base) to the head of your html document. If you're using JSPM, you will also need to configure it with a `baseURL` corresponding to your base tag's `href`. Finally, be sure to set the `config.options.root` to match your base tag's setting.

<code-listing heading="Push State">
  <source-code lang="ES 2015/2016">
    export class App {
      configureRouter(config) {
        config.title = 'Aurelia';
        config.options.pushState = true;
        config.options.root = '/';
        config.map([
          { route: ['welcome'],    name: 'welcome',     moduleId: 'welcome',      nav: true, title:'Welcome' },
          { route: 'flickr',       name: 'flickr',      moduleId: 'flickr',       nav: true, auth: true },
          { route: 'child-router', name: 'childRouter', moduleId: 'child-router', nav: true, title:'Child Router' },
          { route: '',             redirect: 'welcome' }
        ]);
      }
    }
  </source-code>
  <source-code lang="TypeScript">
    import {Redirect, NavigationInstruction, RouterConfiguration} from 'aurelia-router';

    export class App {
      configureRouter(config: RouterConfiguration): void {
        config.title = 'Aurelia';
        config.options.pushState = true;
        config.options.root = '/';
        config.map([
          { route: ['welcome'],    name: 'welcome',     moduleId: 'welcome',      nav: true, title:'Welcome' },
          { route: 'flickr',       name: 'flickr',      moduleId: 'flickr',       nav: true, auth: true },
          { route: 'child-router', name: 'childRouter', moduleId: 'child-router', nav: true, title:'Child Router' },
          { route: '',             redirect: 'welcome' }
        ]);
      }
    }
  </source-code>
</code-listing>

> Warning
> PushState requires server-side support. Don't forget to configure your server appropriately.

### Reusing an existing VM

Since the VM's navigation life-cycle is called only once you may have problems recognizing that the user switched the route from `Product A` to `Product B` (see below).  To work around this issue implement the method `determineActivationStrategy` in your VM and return hints for the router about what you'd like to happen.

> Info
> Additionally, you can add an `activationStrategy` property to your route config if the strategy is always the same and you don't want that to be in your view-model code. Available values are `replace` and `invoke-lifecycle`. Remember, "lifecycle" refers to the navigation lifecycle.

<code-listing heading="Router VM Activation Control">
  <source-code lang="ES 2015/2016">
    //app.js

    export class App {
      configureRouter(config) {
        config.title = 'Aurelia';
        config.map([
          { route: 'product/a',    moduleId: 'product',     nav: true },
          { route: 'product/b',    moduleId: 'product',     nav: true },
        ]);
      }
    }

    //product.js

    import {activationStrategy} from 'aurelia-router';

    export class Product {
      determineActivationStrategy(){
        return activationStrategy.replace;
      }
    }
  </source-code>
  <source-code lang="TypeScript">
    import {RouterConfiguration} from 'aurelia-router';

    //app.ts

    export class App {
      configureRouter(config: RouterConfiguration): void {
        config.title = 'Aurelia';
        config.map([
          { route: 'product/a',    moduleId: 'product',     nav: true },
          { route: 'product/b',    moduleId: 'product',     nav: true },
        ]);
      }
    }

    //product.ts

    import {activationStrategy} from 'aurelia-router';

    export class Product {
      determineActivationStrategy(): string {
        return activationStrategy.replace;
      }
    }
  </source-code>
</code-listing>

### Rendering multiple ViewPorts

> Info
> If you don't name a `router-view`, it will be available under the name `'default'`.

<code-listing heading="Multi-ViewPort View">
  <source-code lang="HTML">
    <template>
      <div class="page-host">
        <router-view name="left"></router-view>
      </div>
      <div class="page-host">
        <router-view name="right"></router-view>
      </div>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Multi-ViewPort View-Model">
  <source-code lang="ES 2015/2016">
    export class App {
      configureRouter(config){
        config.map([{
          route: 'edit',
            viewPorts: {
              left: {
                moduleId: 'editor'
              },
              right: {
                moduleId: 'preview'
              }
            }
          }]);
      }
    }
  </source-code>
  <source-code lang="TypeScript">
    import {RouterConfiguration} from 'aurelia-router';

    export class App {
      configureRouter(config: RouterConfiguration): void {
        config.map([{
          route: 'edit',
            viewPorts: {
              left: {
                moduleId: 'editor'
              },
              right: {
                moduleId: 'preview'
              }
            }
          }]);
      }
    }
  </source-code>
</code-listing>

### Generating Route URLs

<code-listing heading="Generate Route URLs in Code">
  <source-code lang="ES 2015/ES 2016/TypeScript">
    router.generate('routeName', { id: 123 });
  </source-code>
</code-listing>

<code-listing heading="Navigating to a Generated Route">
  <source-code lang="ES 2015/ES 2016/TypeScript">
    router.navigateToRoute('routeName', { id: 123 })
  </source-code>
</code-listing>

<code-listing heading="Rendering an Anchor for a Route">
  <source-code lang="HTML">
    <template>
      <a route-href="route: routeName; params.bind: { id: user.id }">${user.name}</a>
    </template>
  </source-code>
</code-listing>
