"use strict";
class AsSlider {
    isInited;
    currentSlideId;
    sliderWrapper;
    sliderContainer;
    arrowLeft;
    arrowRight;
    autoplayInterval;
    isTouchDevice;
    sliderOptions;
    constructor(slider, options) {
        this.isInited = false;
        this.currentSlideId = 0;
        this.sliderWrapper = document.querySelector(slider);
        this.sliderContainer = document.createElement('div');
        this.arrowLeft = document.createElement('div');
        this.arrowRight = document.createElement('div');
        this.autoplayInterval = undefined;
        this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        this.sliderOptions = {
            autoplay: options?.autoplay ?? false,
            autoplayDelay: options?.autoplayDelay || 5000,
            stopAtAction: (options?.stopAtAction == true) ? true : false,
            stoppedByAction: false,
            pauseOnHover: (options?.pauseOnHover == false) ? false : true,
            transition: options?.transition ?? 'fade',
            arrowsNav: options?.arrowsNav ?? true,
            bulletsNav: options?.bulletsNav ?? false,
            keyboardNav: options?.keyboardNav ?? true,
            captions: options?.captions ?? false,
            autoHeight: options?.autoHeight ?? true,
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
        const currentSlide = this.sliderContainer.children[this.currentSlideId];
        let newHeight = currentSlide.clientHeight;
        newHeight = newHeight + parseInt(window.getComputedStyle(currentSlide).borderTopWidth);
        newHeight = newHeight + parseInt(window.getComputedStyle(currentSlide).borderBottomWidth);
        newHeight = newHeight + parseInt(window.getComputedStyle(currentSlide).marginTop);
        newHeight = newHeight + parseInt(window.getComputedStyle(currentSlide).marginBottom);
        this.sliderContainer.style.height = `${newHeight}px`;
        if (this.sliderOptions.arrowsNav) {
            this.sliderWrapper?.querySelectorAll('.arrow').forEach(arrow => {
                arrow.style.height = `${newHeight}px`;
            });
        }
    }
    ;
    updateActiveBullet(slideId) {
        if (!this.sliderWrapper?.querySelector('.bullet'))
            return;
        this.sliderWrapper.querySelectorAll('.bullet').forEach(elm => {
            elm.classList.remove('active');
        });
        this.sliderWrapper.querySelector(`.bullet[data-slide-id="${slideId}"]`)?.classList.add('active');
    }
    ;
    updateCaption() {
        if (!this.sliderOptions.captions)
            return;
        const wrapperCaptions = this.sliderWrapper?.querySelector('.wrapper-captions');
        const currentSlide = this.sliderContainer.children[this.currentSlideId];
        const captionsParagraph = wrapperCaptions.querySelector('p');
        if (!currentSlide || !wrapperCaptions)
            return;
        const captionTxt = currentSlide.dataset.caption || currentSlide.alt;
        if (captionTxt) {
            if (captionsParagraph) {
                captionsParagraph.innerHTML = captionTxt;
                wrapperCaptions.style.display = 'block';
            }
            else {
                wrapperCaptions.style.display = 'none';
            }
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
        if (this.isInited)
            return;
        this.isInited = true;
        if (!this.sliderWrapper)
            return console.error('sliderWrapper is null/undefined. Check your selector or DOM elements.');
        if (this.sliderWrapper.children.length < 1)
            return console.error('There are no slides inside sliderWrapper.');
        if (this.sliderWrapper.firstElementChild?.tagName === 'IMG') {
            this.sliderWrapper.firstElementChild?.addEventListener('load', () => {
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
        this.sliderContainer.firstElementChild?.classList.add('active');
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
            [this.arrowLeft, this.arrowRight].forEach(arrow => {
                arrow.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (arrow.classList.contains('arrow-left')) {
                        this.movePrev();
                    }
                    else {
                        this.moveNext();
                    }
                    if (this.sliderOptions.stopAtAction) {
                        this.stopAutoplay();
                        this.sliderOptions.stoppedByAction = true;
                    }
                });
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
        if (!this.isTouchDevice && this.sliderOptions.autoplay && this.sliderOptions.pauseOnHover) {
            this.sliderWrapper.addEventListener('mouseenter', () => {
                if (this.autoplayInterval)
                    this.stopAutoplay();
            });
            this.sliderWrapper.addEventListener('mouseleave', () => {
                if (!this.autoplayInterval && this.sliderOptions.stoppedByAction == false)
                    this.startAutoplay();
            });
        }
        if (this.sliderOptions.autoplay) {
            this.startAutoplay();
        }
    }
    ;
}
