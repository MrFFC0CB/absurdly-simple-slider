"use strict";
class AsSlider {
    constructor(slider, options) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.isInited = false;
        this.currentSlideId = 0;
        this.sliderWrapper = document.querySelector(slider);
        this.sliderContainer = document.createElement('div');
        this.arrowLeft = document.createElement('div');
        this.arrowRight = document.createElement('div');
        this.autoplayInterval = undefined;
        this.sliderOptions = {
            autoplay: (_a = options === null || options === void 0 ? void 0 : options.autoplay) !== null && _a !== void 0 ? _a : false,
            autoplayDelay: (options === null || options === void 0 ? void 0 : options.autoplayDelay) || 5000,
            stopAtAction: ((options === null || options === void 0 ? void 0 : options.stopAtAction) == true) ? true : false,
            pauseOnHover: ((options === null || options === void 0 ? void 0 : options.pauseOnHover) == true) ? true : false,
            transition: (_b = options === null || options === void 0 ? void 0 : options.transition) !== null && _b !== void 0 ? _b : 'fade',
            arrowsNav: (_c = options === null || options === void 0 ? void 0 : options.arrowsNav) !== null && _c !== void 0 ? _c : true,
            bulletsNav: (_d = options === null || options === void 0 ? void 0 : options.bulletsNav) !== null && _d !== void 0 ? _d : false,
            keyboardNav: (_e = options === null || options === void 0 ? void 0 : options.keyboardNav) !== null && _e !== void 0 ? _e : true,
            captions: (_f = options === null || options === void 0 ? void 0 : options.captions) !== null && _f !== void 0 ? _f : false,
            autoHeight: (_g = options === null || options === void 0 ? void 0 : options.autoHeight) !== null && _g !== void 0 ? _g : true,
        };
    }
    childrenLength() {
        if (!this.sliderWrapper)
            return 0;
        if (this.sliderContainer.childElementCount > 0) {
            return this.sliderContainer.childElementCount;
        }
        else {
            return this.sliderWrapper.childElementCount;
        }
    }
    ;
    updateHeight() {
        var _a;
        const currentSlide = this.sliderContainer.children[this.currentSlideId];
        let newHeight = currentSlide.clientHeight;
        newHeight = newHeight + parseInt(window.getComputedStyle(currentSlide).borderTopWidth);
        newHeight = newHeight + parseInt(window.getComputedStyle(currentSlide).borderBottomWidth);
        newHeight = newHeight + parseInt(window.getComputedStyle(currentSlide).marginTop);
        newHeight = newHeight + parseInt(window.getComputedStyle(currentSlide).marginBottom);
        this.sliderContainer.style.height = `${newHeight}px`;
        if (this.sliderOptions.arrowsNav) {
            (_a = this.sliderWrapper) === null || _a === void 0 ? void 0 : _a.querySelectorAll('.arrow').forEach(arrow => {
                arrow.style.height = `${newHeight}px`;
            });
        }
    }
    ;
    updateActiveBullet(slideId) {
        var _a, _b;
        if (!((_a = this.sliderWrapper) === null || _a === void 0 ? void 0 : _a.querySelector('.bullet')))
            return;
        this.sliderWrapper.querySelectorAll('.bullet').forEach(elm => {
            elm.classList.remove('active');
        });
        (_b = this.sliderWrapper.querySelector(`.bullet[data-slide-id="${slideId}"]`)) === null || _b === void 0 ? void 0 : _b.classList.add('active');
    }
    ;
    updateCaption() {
        var _a;
        if (!this.sliderOptions.captions)
            return;
        const wrapperCaptions = (_a = this.sliderWrapper) === null || _a === void 0 ? void 0 : _a.querySelector('.wrapper-captions');
        const currentSlide = this.sliderContainer.children[this.currentSlideId];
        const captionsParagraph = wrapperCaptions.querySelector('p');
        if (!currentSlide || !wrapperCaptions)
            return;
        if (currentSlide.hasAttribute('alt') || currentSlide.hasAttribute('data-caption')) {
            wrapperCaptions.style.display = 'block';
            const captionTxt = currentSlide.alt || currentSlide.dataset.caption;
            if (captionTxt && captionsParagraph)
                captionsParagraph.innerHTML = captionTxt;
        }
        else {
            wrapperCaptions.style.display = 'none';
            if (captionsParagraph)
                captionsParagraph.innerHTML = '';
        }
    }
    ;
    movePrev() {
        if (this.currentSlideId === 0) {
            this.sliderContainer.children[this.currentSlideId].classList.remove('active');
            this.sliderContainer.children[this.sliderContainer.children.length - 1].classList.add('active');
            this.currentSlideId = this.sliderContainer.children.length - 1;
        }
        else {
            let currentSlide = this.sliderContainer.children[this.currentSlideId];
            let prevSlide = this.sliderContainer.children[this.currentSlideId - 1];
            prevSlide.classList.add('active');
            currentSlide.classList.remove('active');
            this.currentSlideId--;
        }
        if (this.sliderOptions.autoHeight)
            this.updateHeight();
        if (this.sliderOptions.captions)
            this.updateCaption();
        if (this.sliderOptions.bulletsNav)
            this.updateActiveBullet(this.currentSlideId);
    }
    ;
    moveNext() {
        if (this.currentSlideId >= this.childrenLength() - 1) {
            this.sliderContainer.children[this.currentSlideId].classList.remove('active');
            this.sliderContainer.children[0].classList.add('active');
            this.currentSlideId = 0;
        }
        else {
            let currentSlide = this.sliderContainer.children[this.currentSlideId];
            let nextSlide = this.sliderContainer.children[this.currentSlideId + 1];
            nextSlide.classList.add('active');
            currentSlide.classList.remove('active');
            this.currentSlideId++;
        }
        if (this.sliderOptions.autoHeight)
            this.updateHeight();
        if (this.sliderOptions.captions)
            this.updateCaption();
        if (this.sliderOptions.bulletsNav)
            this.updateActiveBullet(this.currentSlideId);
    }
    ;
    startAutoplay(delay = undefined) {
        if (this.autoplayInterval)
            clearInterval(this.autoplayInterval);
        if (delay) {
            if (typeof delay != 'number')
                return console.error('delay must be a number.');
            if (delay < 0)
                return console.error('delay must be a positive number.');
        }
        const delayTime = (delay) ? Math.trunc(delay) : this.sliderOptions.autoplayDelay;
        this.autoplayInterval = setInterval(() => {
            this.moveNext();
        }, delayTime);
    }
    ;
    stopAutoplay() {
        clearInterval(this.autoplayInterval);
        this.autoplayInterval = undefined;
    }
    ;
    init() {
        var _a, _b, _c;
        if (this.isInited)
            return;
        this.isInited = true;
        if (!this.sliderWrapper)
            return console.error('sliderWrapper is null/undefined. Check your selector or DOM elements.');
        if (this.sliderWrapper.children.length < 1)
            return console.error('There are no slides inside sliderWrapper.');
        if (((_a = this.sliderWrapper.firstElementChild) === null || _a === void 0 ? void 0 : _a.tagName) === 'IMG') {
            (_b = this.sliderWrapper.firstElementChild) === null || _b === void 0 ? void 0 : _b.addEventListener('load', () => {
                if (this.sliderOptions.autoHeight)
                    this.updateHeight();
            });
        }
        this.sliderWrapper.classList.add('as-slider');
        this.sliderContainer.classList.add('as-slider-container');
        const originalChildrenLength = this.sliderWrapper.children.length;
        for (let i = 0; i < originalChildrenLength; i++) {
            const slide = this.sliderWrapper.firstElementChild;
            if (!slide)
                return;
            slide.classList.add('as-slide');
            this.sliderContainer.append(slide);
        }
        this.sliderWrapper.setAttribute('data-transition', this.sliderOptions.transition);
        (_c = this.sliderContainer.firstElementChild) === null || _c === void 0 ? void 0 : _c.classList.add('active');
        this.sliderWrapper.appendChild(this.sliderContainer);
        if (this.sliderOptions.arrowsNav) {
            this.arrowLeft = document.createElement('div');
            this.arrowRight = document.createElement('div');
            this.arrowLeft.classList.add('arrow');
            this.arrowRight.classList.add('arrow');
            this.arrowLeft.classList.add('arrow-left');
            this.arrowRight.classList.add('arrow-right');
            this.arrowLeft.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M28.05 36 16 23.95 28.05 11.9l2.15 2.15-9.9 9.9 9.9 9.9Z"/></svg>';
            this.arrowRight.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="m18.75 36-2.15-2.15 9.9-9.9-9.9-9.9 2.15-2.15L30.8 23.95Z"/></svg>';
            this.sliderWrapper.append(this.arrowLeft);
            this.sliderWrapper.append(this.arrowRight);
            this.arrowLeft.addEventListener('click', (e) => {
                e.preventDefault();
                this.movePrev();
                if (this.autoplayInterval && this.sliderOptions.stopAtAction)
                    this.stopAutoplay();
            });
            this.arrowRight.addEventListener('click', (e) => {
                e.preventDefault();
                this.moveNext();
                if (this.autoplayInterval && this.sliderOptions.stopAtAction)
                    this.stopAutoplay();
            });
        }
        if (this.sliderOptions.captions) {
            this.sliderWrapper.classList.add('has-captions');
            const wrapperCaptions = document.createElement('div');
            wrapperCaptions.classList.add('wrapper-captions');
            wrapperCaptions.innerHTML = '<p></p>';
            this.sliderWrapper.append(wrapperCaptions);
            this.updateCaption();
        }
        if (this.sliderOptions.autoplay) {
            this.startAutoplay();
        }
    }
    ;
}
