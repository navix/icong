[![npm version](https://badge.fury.io/js/icong.svg)](https://www.npmjs.com/package/icong)
![CI](https://github.com/navix/icong/actions/workflows/ci.yml/badge.svg)

# 🦍 icong

## Efficient Angular SVG Icons

Renders icons as symbols in the host, and displays them via `use[href]`.

Inspired by this article: https://css-tricks.com/too-many-svgs-clogging-up-your-markup-try-use/

**Features:**

* Renders icons only once in the DOM, then re-use.
* Load SVG by url or use XML directly.
* Lazy-rendering and lazy-loading.
* No additional wrapper components, direct access to `svg` element.
* No magic coloring or sizing.

> [StackBlitz demo](https://stackblitz.com/edit/icong-demo?file=src/app/app.component.ts)

## Installation

```
$ npm i icong
```


## Usage

Import the module.

```
import { IconModule } from 'icong';
...
@NgModule({
  imports: [
    ...
    IconModule,
```

Place host for symbols rendering (in the root or other shared place). It is invisible.

```html
<icons-host></icons-host>
```

Add icons to registry.

```typescript
import { IconsRegistry } from 'icong';
...
constructor(
  private iconsRegistry: IconsRegistry,
) {}
...
this.iconsRegistry.add({name: 'home', xml: '<svg ...'});
this.iconsRegistry.add({name: 'star', url: '/assets/icons/star.svg'});
// or
this.iconsRegistry.add([
  {name: 'home', xml: '<svg ...'},
  {name: 'star', url: '/assets/icons/star.svg'},
]);
```

Display icons in a template:

```html
<svg icon="home"></svg>
<svg icon="star"></svg>
```

### Color

Icong does not apply any additional changes to the `sgv` code or to the wrappers. You need to manage colors yourself.

I prefer to change `fill` attribute in the `svg` from particular color to `currentColor`. 

### Size

Icons are too different: in sizes, proportions, boldness etc. Then we need to place them in very different environments.

A non-generalized solution works good here, I prefer to define `svg` sizes in CSS.

You always can create a wrapper component or directive that will solve exactly your issue.
