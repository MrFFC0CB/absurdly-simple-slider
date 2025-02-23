"use strict";
class AsSlider {
    isInited;
    sliderWrapper;
    sliderContainer;
    sliderOptions;
    constructor(slider, options) {
        this.isInited = false;
        this.sliderWrapper = document.querySelector(slider);
        this.sliderContainer = document.createElement('div');
        this.sliderOptions = {
            autoplay: options?.autoplay ?? false,
            autoplayDelay: options?.autoplayDelay || 5000,
            stopAtAction: (options?.stopAtAction == true) ? true : false,
            pauseOnHover: (options?.pauseOnHover == true) ? true : false,
            transition: options?.transition ?? 'fade',
            arrowsNav: options?.arrowsNav ?? true,
            bulletsNav: options?.bulletsNav ?? false,
            keyboardNav: options?.keyboardNav ?? true,
            captions: options?.captions ?? false,
            autoHeight: options?.autoHeight ?? true,
        };
    }
    init() {
        console.log(`isInited: ${this.isInited}`);
        if (this.isInited)
            return;
        this.isInited = true;
        console.log(`%cInitiated! %cisInited: %c${this.isInited}`, 'font-weight: bold;', 'font-weight: normal;', 'font-weight: bold;');
    }
}
