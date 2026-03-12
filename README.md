# Absurdly Simple Slider

A really simple JavaScript slider.

---

## Why?

It started as a super basic image slider I built for a work project that needed something lightweight and simple. Over time, similar needs kept popping up in other projects—sometimes with extra requirements. So I kept tweaking the original code, adding features as needed, and eventually, it evolved into its own thing: a general-purpose, absurdly simple slider.

---

## Use this when

- You need a simple image slider
- Don’t want dependencies
- Don’t want configuration hell
- You’re fine with fade-only transitions

---

## Features

- No dependencies
- Just two files
- Navigation via arrows, bullets, or both.
- Supports keyboard navigation (slider must be focused)
- Supports captions
- Minimal API, no drama
- Lightweight (~10KB minified files)

---
## Examples

You can find some examples here: [https://mrffc0cb.github.io/absurdly-simple-slider/](https://mrffc0cb.github.io/absurdly-simple-slider/)

---

## Installation

Download the files from the `dist` folder and place them wherever you want in your project.

Include the CSS file inside your `<head>` element.
```html
<link rel="stylesheet" href="absurdly-simple-slider/as-slider.min.css">
```

Include the JS file before the closing `</body>` tag.
```html
<script src="absurdly-simple-slider/as-slider.min.js"></script>
```

---

## Basic Usage

```html
<style>
	.slider {
		width: 600px;
		height: 600px;
	}
</style>

<div class="slider">
	<img src="images/slide-1.jpg" alt="">
	<img src="images/slide-2.jpg" alt="">
	<img src="images/slide-3.jpg" alt="">
</div>

<script>
	const slider = new AsSlider(".slider").init();
</script>
```
Alternatively, you can create the instance first and call `init()` later in your code:
```js
// create slider instance
const slider = new AsSlider(".slider");

/*
 rest of your code
*/

// initialize slider
slider.init();
```
### Passing options.
Directly:
```js
const slider = new AsSlider(".slider", {
	autoplay: true,
	autoplayDelay: 3000
});
```
Using a predefined options object:
```js
const options = {
	autoplay: true,
	autoplayDelay: 3000
};
const slider = new AsSlider(".slider", options);
```

---

## Options

| Name           | Type          | Default     | Description |
|-|-|-|-|
| autoplay       | `boolean`     | `false`     | Automatically cycles through slides. |
| autoplayDelay  | `number` (ms) | `5000`      | Delay between slides when autoplay is active (in ms). |
| autoplayCustomFunction | `function` | `null` | A user-provided function that replaces the default autoplay behavior, giving full control over slide progression. |
| stopAtAction   | `boolean`     | `false`     | Stop autoplay when the user interacts (arrows or bullets). |
| stoppedByAction| `boolean`     | `false`     | Indicates if autoplay was stopped due to user interaction. |
| pauseOnHover   | `boolean`     | `true`      | Pause autoplay when the mouse is over the slider. |
| transition     | `string`      | `'fade'`    | Transition effect between slides (currently only `'fade'`). |
| arrowsNav      | `boolean`     | `true`      | Show navigation arrows. |
| bulletsNav     | `boolean`     | `false`     | Show navigation bullets. |
| keyboardNav    | `boolean`     | `true`      | Allow navigation with keyboard arrow keys (slider must be focused). |
| captions       | `boolean`     | `false`     | Show captions from the `alt` attribute or custom markup. |
| autoHeight     | `boolean`     | `true`      | Adjust the slider’s height to match the current slide. |

---

## Methods

| Name | Params | Description | Returns |
|-|-|-|-|
| `slider.childrenLength()`           |                 | Returns the total number of slides.                       | `number` (int) |
| `slider.getActiveSlideElm()`        |                 | Returns the HTML element of the currently active slide.   | `HTMLElement` |
| `slider.updateHeight()`             |                 | Updates the slider height based on the current slide.     | `void` |
| `slider.updateCaption()`            |                 | Updates the slider global caption.                        | `void` |
| `slider.stopAtActionMethod()`       |                 | Stops autoplay when user clicks on nav arrows or bullets. | `void` |
| `slider.movePrev()`                 |                 | Moves to the previous slide.                              | `void` |
| `slider.moveNext()`                 |                 | Moves to the next slide.                                  | `void` |
| `slider.goToSlide(index)`           | `index: number` | Goes to a specific slide.                                | `void` |
| `slider.stopAutoplay()`             |                 | Stops the autoplay.                                       | `void` |
| `slider.hideShowArrowsNavigation()` |                 | Shows or hides arrows based on state.                     | `void` |
| `slider.init()`                     |                 | Initializes the slider.                                   | `slider instance` or `undefined` if it’s already initialized |

---

## Properties

| Name | Description | Returns |
|-|-|-|
| isInited         | Indicates if the slider is already initialized.                | `true` \| `false` |
| currentSlideId   | Index of the current slide.                                    | `number` |
| sliderWrapper    | Slider wrapper element.                                        | `HTMLDivElement` \| `undefined` |
| sliderContainer  | Element containing the slides.                                 | `HTMLDivElement` \| `undefined` |
| arrowLeft        | Left arrow element.                                            | `HTMLDivElement` \| `undefined` |
| arrowRight       | Right arrow element.                                           | `HTMLDivElement` \| `undefined` |
| autoplayInterval | Holds the autoplay interval ID, or null if not running.        | `number`         \| `null`      |
| isTouchDevice    | Indicates if the device has touch support.                     | `true` \| `false` |
| sliderOptions    | Object containing all active slider options.                   | `object` |

---

## Behavior Notes

- The slider rewrites the DOM structure on initialization.
- Slides are reparented into an internal container.
- Calling `init()` more than once has no effect.
- Autoplay pauses when the slider leaves the viewport.

---

## Credits

Images used in this project come from [Lorem Picsum](https://picsum.photos/), which pulls from [Unsplash](https://unsplash.com/).  
Thanks to the developers and photographers!

And thanks to [RoyalSlider](https://dimsemenov.com/plugins/royal-slider/) by [Dmitry Semenov](https://dimsemenov.com/) for being a huge inspiration for this project and an awesome slider too.

---

## License

This project is licensed under the MIT License — see the `LICENSE` file for details.