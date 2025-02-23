interface Options {
	autoplay: boolean;
	autoplayDelay: number;
	stopAtAction: boolean;
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
	sliderWrapper: HTMLElement | null;
	sliderContainer: HTMLElement;
	sliderOptions: object;

	constructor(slider: string, options: Options | undefined) {
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

		if (this.isInited) return;
		this.isInited = true;
	
		console.log(`%cInitiated! %cisInited: %c${this.isInited}`, 'font-weight: bold;', 'font-weight: normal;', 'font-weight: bold;');
	}
}