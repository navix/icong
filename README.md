# 🦍 IKONG

## Efficient Angular SVG Icons

Renders icons as symbols in the host, and displays them via `use[href]`.

Features:

* Renders icons only once in the DOM, then re-use.
* Load SVG by url or use XML directly.
* Lazy-rendering and lazy-loading.
* No additional wrapper components, direct access to `svg` element.
* No magic coloring or sizing.


## Installation

```
$ npm i @novyk/ikong
```


## Usage

Place host for symbols rendering (in the root or other shared place):

```html
<icons-host></icons-host>
```

Add icons to registry:

```typescript
constructor(
  private iconsRegistry: IconsRegistry,
) {}
...
this.iconsRegistry.add({name: 'star', url: '/assets/icons/star.svg'});
// or
this.iconsRegistry.add([
  {name: 'star', url: '/assets/icons/star.svg'},
  {name: 'cloud', url: '/assets/icons/cloud.svg'},
  {name: 'home', xml: '<svg ...'}
]);
```

Use in a template:
 
```html
<svg icon="star"></svg>
<svg icon="cloud"></svg>
```
