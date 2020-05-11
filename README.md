# sx-icon

## Angular SVG Icons Handler


## Installation

```
$ npm i @novyk/sx-icon
```


## Usage

Add icons to registry:

```typescript
constructor(
  private iconsRegistry: SxIconsRegistry,
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
<sx-icon name="star"></sx-icon>
```
