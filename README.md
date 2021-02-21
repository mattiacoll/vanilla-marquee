# vanilla-marquee

An es5 vanilla-js implementation of [jQuery.marquee](https://github.com/aamirafridi/jQuery.Marquee/blob/master/)

## Installation

```
npm i vanilla-marquee
```

## Usage

```
import maqruee from 'vanilla-marquee'

new marquee( element, {
  options
})
```

---

## Differences between this plugin and jQuery.marquee

Although this plugin can be a drop in replacment for the jQuery plugin there are some caveats, which may be deal breaking:
- `allowCss3Support` and `easing` options have been removed (all animations use the @keyframe implementation)
- `pauseOnCycle` option has been removed, since it was available only when `allowCss3Support` was set to `false`
- no IE and dead browser support, since we are in $currentYear i don't think it's necessary
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

- **`css3easing`** a css3 transtion timing. Default: `'linear'`
- **`delayBeforeStart`** Time in milliseconds before the marquee starts animating. Default: `1000`.
- **`direction`** Direction towards which the marquee will animate ` 'left' | 'right' | 'up' | 'down'`. Default: `'left'`. Todo: need to change this to ltr/rtl etc
- **`duplicated`** Should the marquee be duplicated to show an effect of continuous flow. Use this only when the text is shorter than the container. Default: `false`
- **`duration`** Duration in milliseconds in which you want your element to travel. Default: `5000`.
- **`speed`** Speed will override duration. Speed allows you to set a relatively constant marquee speed regardless of the width of the containing element. Speed is measured in pixels/second. Default `0`.
- **`gap`** Gap in pixels between the tickers. Will work only when the `duplicated` option is set to `true`. Default: `20`. Note: 20 means 20px so no need to use '20px' as the value.
- **`pauseOnHover`** Pause the marquee on hover. Default: `false`.
- **`startVisible`** The marquee will be visible from the start if set to `true`. Default `false`.

## Methods

- **`pause`**: To pause the marquee at any time.
- **`resume`**: To resume the marquee after being paused previously.
- **`toggle`**: To toggle between `pause` and `resume` methods.
- **`destroy`**: To remove the marquee and all attached events from your element. This method is useful if you are loading/changing the data using Ajax or just another string. You can combine this with the finished event so you can have the marquee show some data and as soon as it finishes showing that, you can destroy it, change the html and then apply the plugin again.

## Events:

 - **`beforeStarting`:** Event will be fired on the element before animation starts.
 - **`finished`:** Event will be fired on the element on each iteration of the animation when it finishes.
 - **`paused`:** Event will be fired on the element when the animation is paused.
 - **`resumed`:** Event will be fired on the element when the animation is resumed.