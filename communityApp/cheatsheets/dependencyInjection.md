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
