## [Templating Basics](aurelia-doc://section/4/version/1.0.0)

<code-listing heading="A Simple Template">
  <source-code lang="HTML">
    <template>
      <div>Hello World!</div>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Requiring Resources">
  <source-code lang="HTML">
    <template>
      <require from='nav-bar'></require>

      <nav-bar router.bind="router"></nav-bar>

      <div class="page-host">
        <router-view></router-view>
      </div>
    </template>
  </source-code>
</code-listing>

> Info: Invalid Table Structure When Dynamically Creating Tables
> When the browser loads in the template it very helpfully validates the structure of the HTML, notices that you have an invalid tag inside your table definition, and very unhelpfully removes it for you before Aurelia even has a chance to examine your template.

Use of the `as-element` attribute ensures we have a valid HTML table structure at load time, yet we tell Aurelia to treat its contents as though it were a different tag.

<code-listing heading="Compose an existing object instance with a view.">
  <source-code lang="HTML">
    <template>
      <table>
        <tr repeat.for="r of ['A','B','A','B']" as-element="compose" view='./template_${r}.html'>
      </table>
    <template>
  </source-code>
</code-listing>

For the above example we can then programmatically choose the embedded template based on an element of our data:

<code-listing heading="template_A.html">
  <source-code lang="HTML">
    <template>
      <td>I'm an A Row</td><td>Col 2A</td><td>Col 3A</td>
    </template>
  </source-code>
</code-listing>
<code-listing heading="template_B.html">
  <source-code lang="HTML">
    <template>
      <td>I'm an B Row</td><td>Col 2B</td><td>Col 3B</td>
    </template>
  </source-code>
</code-listing>

Note that when a `containerless` attribute is used, the container is stripped *after* the browser has loaded the DOM elements, and as such this method cannot be used to transform non-HTML compliant structures into compliant ones!

<code-listing heading="Illegal Table Code">
  <source-code lang="HTML">
    <template>
      <table>
        <template repeat.for="customer of customers">
          <tr>
            <td>${customer.fullName}</td>
          </tr>
        </template>
      </table>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Correct Table Code">
  <source-code lang="HTML">
    <template>
      <table>
        <tr repeat.for="customer of customers">
          <td>${customer.fullName}</td>
        </tr>
      </table>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Illegal Select Code">
  <source-code lang="HTML">
    <template>
      <select>
        <template repeat.for="customer of customers">
          <option>...</option>
        </template>
      </select>
    </template>
  </source-code>
</code-listing>

<code-listing heading="Correct Select Code">
  <source-code lang="HTML">
    <template>
      <select>
        <option repeat.for="customer of customers">...</option>
      </select>
    </template>
  </source-code>
</code-listing>
