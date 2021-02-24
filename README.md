<img align="right" width="300px" src="assets/images/ariato.jpg" style="margin: 0 0 72px 48px;" />

# Ariato

Ariato is a vanilla CSS and Javascript web UI framework that encourages writing better html markup. It was initially made for https://www.rorvswild.com, the Ruby on Rails monitoring tool.

## Documentation
https://ariato.org

This repository contains a Jekyll website that serves as a documentation and a styleguide to preview separated css and javascript files modifications, and to generate concatenated files.

## ariato.css
*ariato.css* brings **coherent style** to HTML elements and components, without requiring to add dozens of CSS classes.

*ariato.css* cares about **color**, **contrast**, **typography**, **spacing** and **rythm** and sets sensible design constraints. It uses modern CSS to provide features such as **dark mode**.

*ariato.css* first targets classless HTML elements.

```html
  <!-- button example -->
  <button type="button">button</button>
  <input type="submit" value="submit button">
  <span role="button">button</span>

  <!-- this is not semantic and not styled as a button. Ariato doesn't include a .button class since there are already better ways. -->
  <span class="button">not a button</span>
```

Then, *ariato.css* targets classless Wai-aria roles and states to style other usual web application components.

```html
  <!-- tab example -->
  <ul role="tablist">
    <li role="tab" aria-controls="tab-1" aria-selected="true">Tab 1</li>
    <li role="tab" aria-controls="tab-2">Tab 2</li>
    <li role="tab" aria-controls="tab-3" aria-disabled="true">Tab 3</li>
    <li role="tab" aria-controls="tab-4">Tab 4</li>
  </ul>
  <div role="tabpanel" id="tab-1">
    <p>Tabpanel 1</p>
  </div>
  <div role="tabpanel" id="tab-2">
    <p>Tabpanel 2</p>
  </div>
  <div role="tabpanel" id="tab-3">
    <p>Tabpanel 3</p>
  </div>
  <div role="tabpanel" id="tab-4">
    <p>Tabpanel 4</p>
  </div>
```

Only after that, if no existing html element or wai-aria role does the job, it uses minimal css classes. (ex: ```.card```)

We then use the context (ex: ```.card > header```), or modifier classes (ex: ```.is-something```) to style variants. 

### Layouts not included
Thanks to modern properties like ```grid```, ```flex``` or ```clamp```, most page layouts can be done in just a few lines of CSS. Ariato doesn't include a complex 12 columns layout system or all variants a component could have. An external directory may later provide a collection of components and templates.

## ariato.js

*ariato.js* is a small, dependency-free vanilla Javascript library powering some of the components like the tabs or the carousel. It targets aria roles and states if available, or relies on data attributes. It also add keyboard navigation to this components.

## *”No aria is better than bad aria“*

Wai-aria is sometimes confusing. The official documentation starts by the intimidating claim that *no aria is better than bad aria*. One of our goal is to figure out what good aria is, and to make it easier to use properly.

# Quick use

### jsdelivr CDN

Link to ariato.css and ariato.js in your html layout.

```html
<html>
  <head>
    <!-- css -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/ariato@1.1.0/dist/ariato.min.css" type="text/css">
    <!-- js -->
    <script src="https://cdn.jsdelivr.net/npm/ariato@1.1.0/dist/ariato.min.js"></script>
  </head>
  <body>
    ...
  <body>
</html>
```

### or install via npm

```shell
npm install ariato --save
```


## Install 

This is a Jekyll website. Install it to use it as a styleguide and to edit separated css and js files.
Install Jekyll: https://jekyllrb.com/


## MIT License

Made by [Base Secrète](https://basesecrete.com).

Rails developer? Check out [RoRvsWild](https://rorvswild.com), our Ruby on Rails application monitoring tool.

