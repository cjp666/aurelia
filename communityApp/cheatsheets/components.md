## [Creating Components](aurelia-doc://section/2/version/1.0.0)

UI components consist of two parts: a view-model and a view. Simply create each part in its own file. Use the same file name but different file extensions for the two parts. For example: _hello${context.language.fileExtension}_ and _hello.html_.

<code-listing heading="Explicit Configuration">
  <source-code lang="ES 2015">
    import {useView, decorators} from 'aurelia-framework';

    export let Hello = decorators(useView('./hello.html')).on(class {
      ...
    });
  </source-code>
  <source-code lang="ES 2016">
    import {useView} from 'aurelia-framework';

    @useView('./hello.html')
    export class Hello {
      ...
    }
  </source-code>
  <source-code lang="TypeScript">
    import {useView} from 'aurelia-framework';

    @useView('./hello.html')
    export class Hello {
      ...
    }
  </source-code>
</code-listing>

#### The Component Lifecycle

Components have a well-defined lifecycle:

1. `constructor()` - The view-model's constructor is called first.
2. `created(owningView: View, myView: View)` - If the view-model implements the `created` callback it is invoked next. At this point in time, the view has also been created and both the view-model and the view are connected to their controller. The created callback will receive the instance of the "owningView". This is the view that the component is declared inside of. If the component itself has a view, this will be passed second.
3. `bind(bindingContext: Object, overrideContext: Object)` - Databinding is then activated on the view and view-model. If the view-model has a `bind` callback, it will be invoked at this time. The "binding context" to which the component is being bound will be passed first. An "override context" will be passed second. The override context contains information used to traverse the parent hierarchy and can also be used to add any contextual properties that the component wants to add. It should be noted that when the view-model has implemented the `bind` callback, the databinding framework will not invoke the changed handlers for the view-model's bindable properties until the "next" time those properties are updated. If you need to perform specific post-processing on your bindable properties, when implementing the `bind` callback, you should do so manually within the callback itself.
4. `attached()` - Next, the component is attached to the DOM (in document). If the view-model has an `attached` callback, it will be invoked at this time.
5. `detached()` - At some point in the future, the component may be removed from the DOM. If/When this happens, and if the view-model has a `detached` callback, this is when it will be invoked.
6. `unbind()` - After a component is detached, it's usually unbound. If your view-model has the `unbind` callback, it will be invoked during this process.

## [Dependency Injection](aurelia-doc://section/3/version/1.0.0)

<code-listing heading="Declaring Dependencies">
  <source-code lang="ES 2016">
    import {inject} from 'aurelia-framework';
    import {Dep1} from 'dep1';
    import {Dep2} from 'dep2';

    @inject(Dep1, Dep2)
    export class CustomerDetail {
      constructor(dep1, dep2) {
        this.dep1 = dep1;
        this.dep2 = dep2;
      }
    }
  </source-code>
  <source-code lang="ES 2015">
    import {Dep1} from 'dep1';
    import {Dep2} from 'dep2';

    export class CustomerDetail {
      static inject() { return [Dep1, Dep2]; }

      constructor(dep1, dep2) {
        this.dep1 = dep1;
        this.dep2 = dep2;
      }
    }
  </source-code>
  <source-code lang="TypeScript">
    import {autoinject} from 'aurelia-framework';
    import {Dep1} from 'dep1';
    import {Dep2} from 'dep2';

    @autoinject
    export class CustomerDetail {
      constructor(private dep1: Dep1, private dep2: Dep2){ }
    }
  </source-code>
</code-listing>

<code-listing heading="Using Resolvers">
  <source-code lang="ES 2016">
    import {Lazy, inject} from 'aurelia-framework';
    import {HttpClient} from 'aurelia-fetch-client';

    @inject(Lazy.of(HttpClient))
    export class CustomerDetail {
      constructor(getHTTP){
        this.getHTTP = getHTTP;
      }
    }
  </source-code>
  <source-code lang="ES 2015">
    import {Lazy} from 'aurelia-framework';
    import {HttpClient} from 'aurelia-fetch-client';

    export class CustomerDetail {
      static inject() { return [Lazy.of(HttpClient)]; }

      constructor(getHTTP){
        this.getHTTP = getHTTP;
      }
    }
  </source-code>
  <source-code lang="TypeScript">
    import {Lazy, inject} from 'aurelia-framework';
    import {HttpClient} from 'aurelia-fetch-client';

    @inject(Lazy.of(HttpClient))
    export class CustomerDetail {
      constructor(private getHTTP: () => HttpClient){ }
    }
  </source-code>
</code-listing>

#### Available Resolvers

* `Lazy` - Injects a function for lazily evaluating the dependency.
    * ex. `Lazy.of(HttpClient)`
* `All` - Injects an array of all services registered with the provided key.
    * ex. `All.of(Plugin)`
* `Optional` - Injects an instance of a class only if it already exists in the container; null otherwise.
    * ex. `Optional.of(LoggedInUser)`

<code-listing heading="Explicit Registration">
  <source-code lang="ES 2016">
    import {transient, inject} from 'aurelia-framework';
    import {HttpClient} from 'aurelia-fetch-client';

    @transient()
    @inject(HttpClient)
    export class CustomerDetail {
      constructor(http) {
        this.http = http;
      }
    }
  </source-code>
  <source-code lang="ES 2015">
    import {transient, inject} from 'aurelia-framework';
    import {HttpClient} from 'aurelia-fetch-client';

    export let CustomDetail = decorators(
      transient()
      inject(HttpClient)
    ).on(class {
      constructor(http) {
        this.http = http;
      }
    });
  </source-code>
  <source-code lang="TypeScript">
    import {transient, autoinject} from 'aurelia-framework';
    import {HttpClient} from 'aurelia-fetch-client';

    @transient()
    @autoinject
    export class CustomerDetail {
      constructor(private http: HttpClient) { }
    }
  </source-code>
</code-listing>
