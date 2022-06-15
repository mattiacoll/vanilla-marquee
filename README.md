# vanilla-marquee

![Badge](https://img.shields.io/github/license/mattiacoll/vanilla-marquee)
![Badge](https://img.shields.io/npm/dt/vanilla-marquee)
![Badge](https://img.shields.io/jsdelivr/npm/hm/vanilla-marquee)

An es5 vanilla-js implementation of [jQuery.marquee](https://github.com/aamirafridi/jQuery.Marquee/)

## Installation

```
npm i vanilla-marquee
```

## Usage

```javascript
import marquee from 'vanilla-marquee'

new marquee( element, {
  options
})
```

## Demo

https://mattiacoll.github.io/vanilla-marquee-site/

---

## Differences between this plugin and jQuery.marquee

Although this plugin can be a drop in replacment for the jQuery plugin there are some caveats, which may be deal breaking:
- `allowCss3Support` and `easing` options have been removed (all animations use the @keyframe implementation)
- `pauseOnCycle` option has been removed, since it was available only when `allowCss3Support` was set to `false`
- no IE and dead browser support, since we are in $currentYear I don't think it's necessary
- this module is not transpiled for old browsers, you can transpile it yourself:
example with rollup and babel
```javascript
babel({
  babelHelpers: 'bundled',
  exclude:      '/node_modules/',
  include: [
    'src/**', // src folder
    /node_modules\/.+(vanilla-marquee|matt-utils)/,
  ]
}),
```
- the methods can only be called with `instance.method()`, in the jQuery version they can be called using `$( selector ).marquee( 'methodName' )`
- events are fired on the selector rathen than the instance

---

## Documentation

All the options, methods and events have been moved to the [Wiki page](https://github.com/mattiacoll/vanilla-marquee/wiki/Documentation)

## How to contribute

### Prerequisites

* Install nodeJS: https://nodejs.org
* Switch to the project root directory with the command-line.
* Run ```npm install``` to install dependencies and create the virtual environment.

### Making changes

* Edit source code in the `src` folder.
* Once ready, compile the package with `npm run rl`.
