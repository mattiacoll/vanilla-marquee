# vanilla-marquee

An es5 vanilla-js implementation of [jQuery.marquee](https://github.com/aamirafridi/jQuery.Marquee/)

## Installation

```
npm i vanilla-marquee
```

## Usage

```
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
```
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

## Options

| Option | Default | Description |
| --- | --- | --- |
| `css3easing` | `'linear'` | a css3 transtion timing |
| `delayBeforeStart` | `1000` | Time in ms before the marquee starts animating |
| `direction` | `'left'` | Direction towards which the marquee will animate ` 'left', 'right', 'up', 'down'` |
| `duplicated` | `false` | Should the marquee be duplicated to show an effect of continuous flow. Use this only when the text is shorter than the container |
| `duration` | `5000` | Duration in ms in which you want your element to travel |
| `speed` | `0` | Speed will override duration. Speed allows you to set a relatively constant marquee speed regardless of the width of the containing element. Speed is measured in pixels/second |
| `gap` | `20` | Gap in pixels between the tickers. Will work only when the `duplicated` option is set to `true`. Note: `20` means `20px` so no need to use `'20px'` as the value. |
| `pauseOnHover` | `false` | Pause the marquee on hover. |
| `startVisible` | `false` | The marquee will be visible from the start if set to `true`. |
| `recalcResize` | `false` | Should the marquee be updated on resize. |

## Methods

| Name | Description |
| --- | --- |
| `pause` | To pause the marquee at any time. |
| `resume` | To resume the marquee after being paused previously. |
| `toggle` | To toggle between `pause` and `resume` methods. |
| `destroy` | To remove the marquee and all attached events from your element. This method is useful if you are loading/changing the data using Ajax or just another string. You can combine this with the finished event so you can have the marquee show some data and as soon as it finishes showing that, you can destroy it, change the html and then apply the plugin again. |
| `refresh` | Recalcs the marquee size and position. Works like the `recalcResize` but is triggered manually instead of on window resize. |

## Events:

| Name | Description |
| --- | --- |
| `beforeStarting` | Event will be fired on the element before animation starts. |
| `finished` | Event will be fired on the element on each iteration of the animation when it finishes. |
| `paused` | Event will be fired on the element when the animation is paused. |
| `resumed` | Event will be fired on the element when the animation is resumed. |

## How to contribute

### Prerequisites

* Install Visual Studio Code: https://code.visualstudio.com/
* Install Github Desktop: https://desktop.github.com/
* Install nodeJS: https://nodejs.org
* Switch to the project root directory with the command-line.
* Run ```npm install``` to install dependencies and create the virtual environment.

### Making changes

* Edit source code in the `src` folder.
* Once ready, compile the package with `npm run rl`.
