## [Databinding](aurelia-doc://section/5/version/1.0.0)

### bind, one-way, two-way & one-time

Use on any HTML attribute.

* `.bind` - Uses the default binding. One-way binding for everything but form controls, which use two-way binding.
* `.one-way` - Flows data one direction: from the view-model to the view.
* `.two-way` - Flows data both ways: from view-model to view and from view to view-model.
* `.one-time` - Renders data once, but does not synchronize changes after the initial render.

<code-listing heading="Data Binding Examples">
  <source-code lang="HTML">
    <template>
      <input type="text" value.bind="firstName">
      <input type="text" value.two-way="lastName">

      <a href.one-way="profileUrl">View Profile</a>
    </template>
  </source-code>
</code-listing>

> Info
> At the moment inheritance of bindables is not supported. For use cases where `class B extends A` and `B` is used as custom Element/Attribute `@bindable` properties cannot be defined only on `class A`. If inheritance is used, `@bindable` properties should be defined on the instantiated class.

### delegate, trigger

Use on any native or custom DOM event. (Do not include the "on" prefix in the event name.)

* `.trigger` - Attaches an event handler directly to the element. When the event fires, the expression will be invoked.
* `.delegate` - Attaches a single event handler to the document (or nearest shadow DOM boundary) which handles all events of the specified type, properly dispatching them back to their original targets for invocation of the associated expression.

> Info
> The `$event` value can be passed as an argument to a `delegate` or `trigger` function call if you need to access the event object.

<code-listing heading="Event Binding Examples">
  <source-code lang="HTML">
    <template>
      <button click.trigger="save()">Save</button>
      <button click.delegate="save($event)">Save</button>
    </template>
  </source-code>
</code-listing>

### call

Passes a function reference.

<code-listing heading="Call Example">
  <source-code lang="HTML">
    <template>
      <button my-attribute.call="sayHello()">Say Hello</button>
    </template>
  </source-code>
</code-listing>

### ref

Creates a reference to an HTML element, a component or a component's parts.

* `ref="someIdentifier"` or `element.ref="someIdentifier"` - Create a reference to the HTMLElement in the DOM.
* `attribute-name.ref="someIdentifier"`- Create a reference to a custom attribute's view-model.
* `view-model.ref="someIdentifier"`- Create a reference to a custom element's view-model.
* `view.ref="someIdentifier"`- Create a reference to a custom element's view instance (not an HTML Element).
* `controller.ref="someIdentifier"`- Create a reference to a custom element's controller instance.

<code-listing heading="Ref Example">
  <source-code lang="HTML">
    <template>
      <input type="text" ref="name"> ${name.value}
    </template>
  </source-code>
</code-listing>

### String Interpolation

Used in an element's content. Can be used inside attributes, particularly useful in the `class` and `css` attributes.

<code-listing heading="String Interpolation  Example">
  <source-code lang="HTML">
    <template>
      <span>${fullName}</span>
      <div class="dot ${color} ${isHappy ? 'green' : 'red'}"></div>
    </template>
  </source-code>
</code-listing>

### Binding to Select Elements

A typical select element is rendered using a combination of `value.bind` and `repeat`. You can also bind to arrays of objects and synchronize based on an id (or similar) property.

<code-listing heading="Basic Select">
  <source-code lang="HTML">
    <template>
      <select value.bind="favoriteColor">
        <option>Select A Color</option>
        <option repeat.for="color of colors" value.bind="color">${color}</option>
      </select>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Select with Object Array">
  <source-code lang="HTML">
    <template>
      <select value.bind="employeeOfTheMonth">
        <option>Select An Employee</option>
        <option repeat.for="employee of employees" model.bind="employee">${employee.fullName}</option>
      </select>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Select with Object Id Sync">
  <source-code lang="HTML">
    <template>
      <select value.bind="employeeOfTheMonthId">
        <option>Select An Employee</option>
        <option repeat.for="employee of employees" model.bind="employee.id">${employee.fullName}</option>
      </select>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Basic Multi-Select">
  <source-code lang="HTML">
    <template>
      <select value.bind="favoriteColors" multiple>
        <option repeat.for="color of colors" value.bind="color">${color}</option>
      </select>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Multi-Select with Object Array">
  <source-code lang="HTML">
    <template>
      <select value.bind="favoriteEmployees" multiple>
        <option repeat.for="employee of employees" model.bind="employee">${employee.fullName}</option>
      </select>
    </template>
  </source-code>
</code-listing>

### Binding Radios

<code-listing heading="Basic Radios">
  <source-code lang="HTML">
    <template>
      <label repeat.for="color of colors">
        <input type="radio" name="clrs" value.bind="color" checked.bind="$parent.favoriteColor" />
        ${color}
      </label>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Radios with Object Arrays">
  <source-code lang="HTML">
    <template>
      <label repeat.for="employee of employees">
        <input type="radio" name="emps" model.bind="employee" checked.bind="$parent.employeeOfTheMonth" />
        ${employee.fullName}
      </label>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Radios with a Boolean">
  <source-code lang="HTML">
    <template>
      <label><input type="radio" name="tacos" model.bind="null" checked.bind="likesTacos" />Unanswered</label>
      <label><input type="radio" name="tacos" model.bind="true" checked.bind="likesTacos" />Yes</label>
      <label><input type="radio" name="tacos" model.bind="false" checked.bind="likesTacos" />No</label>
    </template>
  </source-code>
</code-listing>

### Binding Checkboxes

> Warning
> You cannot use a `click.delegate` on checkboxes if you want to attach a method to it. You need to use `change.delegate`.

<code-listing heading="Checkboxes with an Array">
  <source-code lang="HTML">
    <template>
      <label repeat.for="color of colors">
        <input type="checkbox" value.bind="color" checked.bind="$parent.favoriteColors" />
        ${color}
      </label>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Checkboxes with an Array of Objects">
  <source-code lang="HTML">
    <template>
      <label repeat.for="employee of employees">
        <input type="checkbox" model.bind="employee" checked.bind="$parent.favoriteEmployees" />
        ${employee.fullName}
      </label>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Checkboxes with Booleans">
  <source-code lang="HTML">
    <template>
      <li><label><input type="checkbox" checked.bind="wantsFudge" />Fudge</label></li>
      <li><label><input type="checkbox" checked.bind="wantsSprinkles" />Sprinkles</label></li>
      <li><label><input type="checkbox" checked.bind="wantsCherry" />Cherry</label></li>
    </template>
  </source-code>
</code-listing>

### Binding innerHTML and textContent

<code-listing heading="Binding innerHTML">
  <source-code lang="HTML">
    <template>
      <div innerhtml.bind="htmlProperty | sanitizeHTML"></div>
      <div innerhtml="${htmlProperty | sanitizeHTML}"></div>
    </template>
  </source-code>
</code-listing>

> Danger
> Always use HTML sanitization. We provide a simple converter that can be used. You are encouraged to use a more complete HTML sanitizer such as [sanitize-html](https://www.npmjs.com/package/sanitize-html).

> Warning
> Binding using the `innerhtml` attribute simply sets the element's `innerHTML` property.  The markup does not pass through Aurelia's templating system.  Binding expressions and require elements will not be evaluated.

<code-listing heading="Binding textContent">
  <source-code lang="HTML">
    <template>
      <div textcontent.bind="stringProperty"></div>
      <div textcontent="${stringProperty}"></div>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Two-Way Editable textContent">
  <source-code lang="HTML">
    <template>
      <div textcontent.bind="stringProperty" contenteditable="true"></div>
    </template>
  </source-code>
</code-listing>

### Binding Style

You can bind a css string or object to an element's `style` attribute. Use the `style` attribute's alias, `css` when doing string interpolation to ensure your application is compatible with Internet Explorer.

<code-listing heading="Style Binding Data">
  <source-code lang="ES 2015/2016">
    export class StyleData {
      constructor() {
        this.styleString = 'color: red; background-color: blue';

        this.styleObject = {
          color: 'red',
          'background-color': 'blue'
        };
      }
    }
  </source-code>
  <source-code lang="TypeScript">
    export class StyleData {
      styleString: string;
      styleObject: any;

      constructor() {
        this.styleString = 'color: red; background-color: blue';

        this.styleObject = {
          color: 'red',
          'background-color': 'blue'
        };
      }
    }
  </source-code>
</code-listing>

<code-listing heading="Style Binding View">
  <source-code lang="HTML">
    <template>
      <div style.bind="styleString"></div>
      <div style.bind="styleObject"></div>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Illegal Style Interpolation">
  <source-code lang="HTML">
    <template>
      <div style="width: ${width}px; height: ${height}px;"></div>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Legal Style Interpolation">
  <source-code lang="HTML">
    <template>
      <div css="width: ${width}px; height: ${height}px;"></div>
    </template>
  </source-code>
</code-listing>

### Declaring Computed Property Dependencies

<code-listing heading="Computed Properties">
  <source-code lang="ES 2015">
    import {declarePropertyDependencies} from 'aurelia-framework';

    export class Person {
      firstName = 'John';
      lastName = 'Doe';

      get fullName(){
        return `${this.firstName} ${this.lastName}`;
      }
    }

    declarePropertyDependencies(Person, 'fullName', ['firstName', 'lastName']);
  </source-code>
  <source-code lang="ES 2016">
    import {computedFrom} from 'aurelia-framework';

    export class Person {
      firstName = 'John';
      lastName = 'Doe';

      @computedFrom('firstName', 'lastName')
      get fullName(){
        return `${this.firstName} ${this.lastName}`;
      }
    }
  </source-code>
  <source-code lang="TypeScript">
    import {computedFrom} from 'aurelia-framework';

    export class Person {
      firstName: string = 'John';
      lastName: string = 'Doe';

      @computedFrom('firstName', 'lastName')
      get fullName(): string {
        return `${this.firstName} ${this.lastName}`;
      }
    }
  </source-code>
</code-listing>
