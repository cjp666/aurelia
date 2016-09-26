## [Templating View Resources](aurelia-doc://section/6/version/1.0.0)

<code-listing heading="Conditionally displays an HTML element.">
  <source-code lang="HTML">
    <template>
      <div show.bind="isSaving" class="spinner"></div>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Conditionally add/remove an HTML element.">
  <source-code lang="HTML">
    <template>
      <div if.bind="isSaving" class="spinner"></div>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Conditionally add/remove a group of elements.">
  <source-code lang="HTML">
    <template>
      <input value.bind="firstName">

      <template if.bind="hasErrors">
          <i class="icon error"></i>
          ${errorMessage}
      </template>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Render an array with a template.">
  <source-code lang="HTML">
    <template>
      <ul>
        <li repeat.for="customer of customers">${customer.fullName}</li>
      </ul>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Render a map with a template.">
  <source-code lang="HTML">
    <template>
      <ul>
        <li repeat.for="[id, customer] of customers">${id} ${customer.fullName}</li>
      </ul>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Render a template N times.">
  <source-code lang="HTML">
    <template>
      <ul>
        <li repeat.for="i of rating">*</li>
      </ul>
    </template>
  </source-code>
</code-listing>

Contextual items available inside a repeat template:

* `$index` - The index of the item in the array.
* `$first` - True if the item is the first item in the array.
* `$last` - True if the item is the last item in the array.
* `$even` - True if the item has an even numbered index.
* `$odd` - True if the item has an odd numbered index.

> Info: Containerless Template Controllers
> The `if` and `repeat` attributes are usually placed on the HTML elements that they affect. However, you can also use a `template` tag to group a collection of elements that don't have a parent element and place the `if` or `repeat` on the `template` element instead.

<code-listing heading="Dynamically render UI into the DOM based on data.">
  <source-code lang="HTML">
    <template repeat.for="item of items">
      <compose model.bind="item" view-model="widgets/${item.type}"></compose>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Composing a view only, inheriting the parent binding context.">
  <source-code lang="HTML">
    <template repeat.for="item of items">
      <compose view="my-view.html"></compose>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Compose an existing object instance with a view.">
  <source-code lang="HTML">
    <template>
      <div repeat.for="item of items">
        <compose view="my-view.html" view-model.bind="item">
      </div>
    </template>
  </source-code>
</code-listing>
