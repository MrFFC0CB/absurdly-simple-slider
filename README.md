# Absurdly Simple Slider

A really simple Javascript slider.

---

## 🧠 Why?

It started as a super basic image slider I built for a work project that needed something lightweight and simple. Over time, similar needs kept popping up in other projects—sometimes with extra requirements. So I kept tweaking the original code, adding features as needed, and eventually, it evolved into its own thing: a general-purpose, absurdly simple slider.

---

## 🚀 Features

- No dependencies
- Just two files
- Navigation via arrows, bullets, or both.
- Supports keyboard navigation (slider must be focused)
- Supports captions
- Minimal API, no drama
- Lightweight (~10KB minified files)

---

## 📦 Installation

Download the files at `dist` folder and place them wherever you want in your project.

Include the CSS file inside your `<head>` element.
```html
<link rel="stylesheet" href="absurdly-simple-slider/as-slider.min.css">
```

Add the JS file at the end of your `<body>` element.
```html
<script src="absurdly-simple-slider/as-slider.min.js"></script>
```

---

## 🧱 Basic Usage

```html
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

---

## ⚙️ Options

| Name           | Type          | Default     |
|----------------|---------------|-------------|
| autoplay       | boolean       | false       |
| autoplayDelay  | number (ms)   | 5000        |
| stopAtAction   | boolean       | false       |
| stoppedByAction| boolean       | false       |
| pauseOnHover   | boolean       | true        |
| transition     | string        | 'fade'      |
| arrowsNav      | boolean       | true        |
| bulletsNav     | boolean       | false       |
| keyboardNav    | boolean       | true        |
| captions       | boolean       | false       |
| autoHeight     | boolean       | true        |

**Note:** Currently, only the `'fade'` transition is available. I plan to add more transition types in the future.

---

## 🛠 Methods

| Name | Description | Returns |
|-|-|-|
| `slider.childrenLength()`           | Gets the total number of slides.                          | number (int) |
| `slider.updateHeight()`             | Updates the slider height based on the current slide.     | void |
| `slider.updateCaption()`            | Updates the slider global caption.                        | void |
| `slider.stopAtActionMethod()`       | Stops autoplay when user clicks on nav arrows or bullets. | void |
| `slider.movePrev()`                 | Moves to the previous slide.                              | void |
| `slider.moveNext()`                 | Moves to the next slide.                                  | void |
| `slider.stopAutoplay()`             | Stops the autoplay.                                       | void |
| `slider.hideShowArrowsNavigation()` | Shows or hides arrows based on state.                     | void |
| `slider.init()`                     | Initializes the slider.                                   | slider `instance` or `undefined` if it’s already initialized |

---

## 🔍 Properties

| Name | Description | Returns |
|-|-|-|
| isInited         | Indicates if the slider is already initialized.                | true \| false |
| currentSlideId   | ID of the current slide.                                       | number |
| sliderWrapper    | Slider wrapper element.                                        | HTMLDivElement \| undefined |
| sliderContainer  | Element containing the slides.                                 | HTMLDivElement \| undefined |
| arrowLeft        | Left arrow element.                                            | HTMLDivElement \| undefined |
| arrowRight       | Right arrow element.                                           | HTMLDivElement \| undefined |
| autoplayInterval | Indicates if the slider autoplay is running or not.            | number \| undefined |
| isTouchDevice    | Indicates if the device has touch support.                     | true \| false |
| sliderOptions    | Object containing all active slider options.                   | object |

---

## 🙏 Credits

Images used in this project come from [Lorem Picsum](https://picsum.photos/), which pulls from [Unsplash](https://unsplash.com/).  
Thanks to the developers and photographers!

And thanks to [RoyalSlider](https://dimsemenov.com/plugins/royal-slider/) by [Dmitry Semenov](https://dimsemenov.com/) for being a huge inspiration for this project and an awesome slider too.

---

## 📄 License

This project is licensed under the MIT License — see the `LICENSE` file for details.