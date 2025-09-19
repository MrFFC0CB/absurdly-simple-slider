interface Options {
	autoplay: boolean;
	autoplayDelay: number;
	stopAtAction: boolean;
	stoppedByAction: boolean;
	pauseOnHover: boolean;
	transition: string;
	arrowsNav: boolean;
	bulletsNav: boolean;
	keyboardNav: boolean;
	captions: boolean;
	autoHeight: boolean;
}

class AsSlider {
	isInited: boolean;
	currentSlideId: number;
	sliderWrapper: HTMLElement | null;
	sliderContainer: HTMLElement;
	arrowLeft: HTMLDivElement | HTMLElement;
	arrowRight: HTMLDivElement | HTMLElement;
	autoplayInterval: number | null;
	isTouchDevice: boolean;
	sliderOptions: Options;

	constructor(slider: string, options: Options | undefined) {
		this.isInited = false;
		this.currentSlideId = 0;
		this.sliderWrapper = document.querySelector(slider);
		this.sliderContainer = document.createElement('div');
		this.arrowLeft = document.createElement('div');
		this.arrowRight = document.createElement('div');
		this.autoplayInterval = null;
		this.isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
		this.sliderOptions = {
			autoplay: options?.autoplay ?? false,
			autoplayDelay: options?.autoplayDelay || 5000,
			stopAtAction: (options?.stopAtAction == true) ? true : false,
			stoppedByAction: false,
			// pauseOnHover: (options?.pauseOnHover == false) ? false : true,
			pauseOnHover: options?.pauseOnHover != false,
			transition: options?.transition ?? 'fade',
			arrowsNav: options?.arrowsNav ?? true,
			bulletsNav: options?.bulletsNav ?? false,
			keyboardNav: options?.keyboardNav ?? true,
			captions: options?.captions ?? false,
			autoHeight: options?.autoHeight ?? true,
		};
	}

	childrenLength(): number {
		if (!this.sliderWrapper) return 0;

		if (this.sliderContainer.childElementCount > 0) {
			return this.sliderContainer.childElementCount;
		} else {
			return this.sliderWrapper.childElementCount;
		}
	};

	updateHeight(): void {
		const currentSlide: Element = this.sliderContainer?.children[this.currentSlideId];

		if (!currentSlide) return;

		let newHeight = currentSlide.clientHeight;

		newHeight = newHeight + parseInt(window.getComputedStyle(currentSlide).borderTopWidth);
		newHeight = newHeight + parseInt(window.getComputedStyle(currentSlide).borderBottomWidth);
		newHeight = newHeight + parseInt(window.getComputedStyle(currentSlide).marginTop);
		newHeight = newHeight + parseInt(window.getComputedStyle(currentSlide).marginBottom);

		this.sliderContainer.style.height = `${newHeight}px`;

		if (this.sliderOptions.arrowsNav) {
			this.sliderWrapper?.querySelectorAll('.arrow').forEach(arrow=>{
				(arrow as HTMLElement).style.height = `${newHeight}px`;
			});
		}
	};

	updateActiveBullet(slideId: number): void {
		if (!this.sliderWrapper?.querySelector('.bullet')) return;

		this.sliderWrapper.querySelectorAll('.bullet').forEach(elm=>{
			elm.classList.remove('active');
		});
		this.sliderWrapper.querySelector(`.bullet[data-slide-id="${slideId}"]`)?.classList.add('active');
	};

	updateCaption(): void {
		if (!this.sliderOptions.captions) return;

		const wrapperCaptions = this.sliderWrapper?.querySelector('.wrapper-captions') as HTMLDivElement;
		const currentSlide = this.sliderContainer.children[this.currentSlideId] as HTMLImageElement;
		const captionsParagraph = wrapperCaptions.querySelector('p');
		
		if (!currentSlide || !wrapperCaptions) return;
		
		// const captionTxt: string | undefined = currentSlide.alt || currentSlide.dataset.caption;
		const captionTxt: string | undefined = currentSlide.dataset.caption || currentSlide.alt;
		
		if (captionTxt) {
			if (captionsParagraph) {
				captionsParagraph.innerHTML = captionTxt;
				wrapperCaptions.style.display = 'block';
			} else {
				wrapperCaptions.style.display = 'none';
			}
		} else {
			wrapperCaptions.style.display = 'none';
			
			if (captionsParagraph) captionsParagraph.innerHTML = '';
		}
	};

	/**
	 * Stops autoplay if it is enabled and stopAtAction is true in the options.
	 * 
	 * Also sets the stoppedByAction property to true.
	 */
	stopAtActionMethod(): void {
		this.stopAutoplay();
		this.sliderOptions.stoppedByAction = true;
	};

	movePrev(): void {
		if (this.currentSlideId === 0) {
			this.sliderContainer.children[this.currentSlideId].classList.remove('active');
			this.sliderContainer.children[this.sliderContainer.children.length - 1].classList.add('active');

			this.currentSlideId = this.sliderContainer.children.length - 1;
		} else {
			let currentSlide = this.sliderContainer.children[this.currentSlideId];
			let prevSlide = this.sliderContainer.children[this.currentSlideId - 1];

			prevSlide.classList.add('active');
			currentSlide.classList.remove('active');

			
			this.currentSlideId--;
		}

		if (this.sliderOptions.autoHeight) this.updateHeight();
		if (this.sliderOptions.captions) this.updateCaption();
		if (this.sliderOptions.bulletsNav) this.updateActiveBullet(this.currentSlideId);
	};

	moveNext(): void {
		if (this.currentSlideId >= this.childrenLength() - 1) {
			this.sliderContainer.children[this.currentSlideId].classList.remove('active');
			this.sliderContainer.children[0].classList.add('active');
			
			this.currentSlideId = 0;
		} else {
			let currentSlide = this.sliderContainer.children[this.currentSlideId];
			let nextSlide = this.sliderContainer.children[this.currentSlideId + 1];
			
			nextSlide.classList.add('active');
			currentSlide.classList.remove('active');
			
			this.currentSlideId++;
		}

		if (this.sliderOptions.autoHeight) this.updateHeight();
		if (this.sliderOptions.captions) this.updateCaption();
		if (this.sliderOptions.bulletsNav) this.updateActiveBullet(this.currentSlideId);
	};

	goToSlide(slideId: number): void {
		if (slideId < 0) return console.error('slideId must be a positive number.');
		if (slideId >= this.childrenLength()) return console.error('slideId must be less than the number of slides.');

		this.sliderContainer.children[this.currentSlideId].classList.remove('active');
		this.sliderContainer.children[slideId].classList.add('active');

		this.currentSlideId = slideId;

		if (this.sliderOptions.autoHeight) this.updateHeight();
		if (this.sliderOptions.captions) this.updateCaption();
		if (this.sliderOptions.bulletsNav) this.updateActiveBullet(this.currentSlideId);
	};

	startAutoplay(delay: number | undefined = undefined): void {
		if (this.autoplayInterval) clearInterval(this.autoplayInterval);

		if (delay) {
			if (typeof delay != 'number') return console.error('delay must be a number.');
			if (delay < 0) return console.error('delay must be a positive number.');
		}

		const delayTime = (delay) ? Math.trunc(delay) : this.sliderOptions.autoplayDelay;

		this.autoplayInterval = setInterval(() => {
			this.moveNext();
		}, delayTime);
	};
	
	stopAutoplay(): void {
		if (this.autoplayInterval) {
			clearInterval(this.autoplayInterval);
			this.autoplayInterval = null;
		}
	};

	/**
	 * Hides or shows the navigation arrows depending on the number of children slides.
	 *
	 * If the number of children slides is more than 1, the arrows are shown,
	 * otherwise they are hidden.
	 */
	hideShowArrowsNavigation(): void {
		if (this.sliderOptions.arrowsNav != true) return;

		if (this.childrenLength() > 1) {
			this.arrowLeft.style.display = '';
			this.arrowRight.style.display = '';
		} else {
			this.arrowLeft.style.display = 'none';
			this.arrowRight.style.display = 'none';
		}
	};

	init(): AsSlider | undefined {
		if (this.isInited) return;

		// check for dom elements to be there
		if (!this.sliderWrapper || !this.sliderContainer) throw new Error('sliderWrapper or sliderContainer are null/undefined. Check your selector or DOM elements.');
		if (this.sliderWrapper.children.length < 1) throw new Error('There are no slides inside sliderWrapper.');

		// build the slider
		this.sliderWrapper.classList.add('as-slider');
		this.sliderContainer.classList.add('as-slider-container');

		const originalChildrenLength = this.sliderWrapper.children.length;
		for (let i = 0; i < originalChildrenLength; i++) {
			const slide = this.sliderWrapper.firstElementChild;
			if (!slide) return;

			slide.classList.add('as-slide');
			this.sliderContainer.append(slide);
		}

		this.sliderWrapper.setAttribute('data-transition', this.sliderOptions.transition);
		this.sliderContainer.firstElementChild?.classList.add('active');

		this.sliderWrapper.appendChild(this.sliderContainer);
		

		// append arrows if necesary
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
				arrow.addEventListener('click', (e)=>{
					e.preventDefault();

					if (arrow.classList.contains('arrow-left')) {
						this.movePrev();
					} else {
						this.moveNext();
					}
	
					if (this.sliderOptions.stopAtAction) this.stopAtActionMethod();
				});
			});

			this.hideShowArrowsNavigation();
		}
			
		// append captions if necesary
		if (this.sliderOptions.captions) {
			this.sliderWrapper.classList.add('has-captions');

			const wrapperCaptions = document.createElement('div');
			wrapperCaptions.classList.add('wrapper-captions');
			wrapperCaptions.innerHTML = '<p></p>';

			this.sliderWrapper.append(wrapperCaptions);

			this.updateCaption();
		}

		// append bullets if necesary
		if (this.sliderOptions.bulletsNav) {
			this.sliderWrapper.classList.add('has-bullets');

			const wrapperBullets = document.createElement('div');
			wrapperBullets.classList.add('wrapper-bullets');
			
			for (let i = 0; i < originalChildrenLength; i++) {
				const bullet = document.createElement('div');
				bullet.classList.add('bullet');
				if (i === 0) bullet.classList.add('active');
				bullet.setAttribute('data-slide-id', i.toString());

				wrapperBullets.append(bullet);
			}

			wrapperBullets.addEventListener('click', (e)=>{
				const target = e.target;
				if (target && target instanceof HTMLElement) {
					if (target.classList.contains('bullet')) {
						const slideToGo = parseInt(target.getAttribute('data-slide-id') || '0');
						
						this.goToSlide(slideToGo);
						this.updateActiveBullet(slideToGo);

						if (this.sliderOptions.stopAtAction) this.stopAtActionMethod();
					}
				}
			});

			this.sliderWrapper.append(wrapperBullets);
		}

		// if the first slide is an image, wait untill DOM loads and update slider height (if autoHeight is enabled).
		if (this.sliderContainer.firstElementChild?.tagName === 'IMG') {
			const tmpImg = new Image();
			
			tmpImg.addEventListener('load', ()=>{
				if (this.sliderOptions.autoHeight) this.updateHeight();
			});

			tmpImg.src = this.sliderContainer.firstElementChild.getAttribute('src') || '';
		}

		// append keyboard navigation if necesary
		if (!this.isTouchDevice && this.sliderOptions.keyboardNav) {
			this.sliderWrapper.setAttribute('tabindex', '0');

			this.sliderWrapper.addEventListener('keydown', (e)=>{
				e.preventDefault();

				if (e.key === 'ArrowLeft') {
					this.movePrev();
				}
				if (e.key === 'ArrowRight') {
					this.moveNext();
				}
				if (e.key === 'Space') {
					if (this.autoplayInterval) {
						this.stopAutoplay();
					} else {
						this.startAutoplay();
					}
				}
			});
		}

		// events for pause on hover
		if (!this.isTouchDevice && this.sliderOptions.autoplay && this.sliderOptions.pauseOnHover) {
			this.sliderWrapper.addEventListener('mouseenter', ()=>{
				if (this.autoplayInterval) this.stopAutoplay();
			});
			this.sliderWrapper.addEventListener('mouseleave', ()=>{
				if (!this.autoplayInterval && this.sliderOptions.stoppedByAction == false) this.startAutoplay();
			});
		}

		// init autoplay if necesary
		if (this.sliderOptions.autoplay) this.startAutoplay();

		if (this.sliderOptions.autoHeight) {
			this.updateHeight();
			window.addEventListener('resize', this.updateHeight.bind(this));
		}

		this.isInited = true;

		return this;
	};
}