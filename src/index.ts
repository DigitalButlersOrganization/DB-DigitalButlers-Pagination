/* eslint-disable max-len */
import { CLASSES } from './constants';

import './style.scss';

import {
	EventModel,
	PageNumberTransformer,
	PaginationConfigModel,
	addButtonsPropertiesModel,
	hiddenButtonsConfigModel,
	pageMapItemModel,
} from './interfaces';

export class Pagination {
	component: HTMLElement;
	paginationWrapperSelector: string;
	paginationWrapper: HTMLElement | undefined;
	dynamicElementSelector: string;
	dynamicElements: HTMLElement[];
	openedElements: HTMLElement[];
	previousButtonInner: string | Node;
	nextButtonInner: string | Node;
	itemsPerPage: number;
	previousButtonClassnames: string[];
	nextButtonClassnames: string[];
	regularButtonClassnames: string[];
	url: URL;
	currentPage: number;
	totalPages: number;
	buttons: HTMLElement[];
	prevButton: HTMLElement | undefined;
	nextButton: HTMLElement | undefined;
	emptyMapInner: string;
	buttonsMap: any[];
	dynamicItemSelector: any;
	hiddenButtons: hiddenButtonsConfigModel;
	pageNumberTransformer: PageNumberTransformer;
	devMode: boolean;
	on: EventModel;

	// eslint-disable-next-line default-param-last
	constructor(
		component: string | HTMLElement = '[data-pagination="wrapper"]',
		{
			paginationWrapperSelector = '[data-pagination="container"]',
			dynamicElementSelector = '.w-dyn-item[role="listitem"]',
			previousButtonInner = 'Prev',
			nextButtonInner = 'Next',
			previousButtonClassnames = [],
			nextButtonClassnames = [],
			regularButtonClassnames = [],
			itemsPerPage,
			emptyMapInner = '...',
			pageNumberTransformer = (number: number) => number.toString(),
			hiddenButtons = {
				min: 6,
			},
			on = {},
			devMode: developmentMode = false,
		}: PaginationConfigModel,
	) {
		this.component = typeof component === 'string' ? (document.querySelector(component) as HTMLElement) : component;
		this.paginationWrapperSelector = paginationWrapperSelector;
		this.paginationWrapper = undefined;
		this.dynamicElementSelector = dynamicElementSelector;
		this.dynamicElements = [];
		this.openedElements = [];
		this.previousButtonInner = previousButtonInner;
		this.nextButtonInner = nextButtonInner;
		this.itemsPerPage = itemsPerPage;
		this.url = new URL(window.location.href);
		this.currentPage = 1;
		this.totalPages = 1;
		this.buttons = [];
		this.prevButton = undefined;
		this.nextButton = undefined;
		this.buttonsMap = [];
		this.emptyMapInner = emptyMapInner;
		this.hiddenButtons = hiddenButtons;
		this.pageNumberTransformer = pageNumberTransformer;
		this.on = on;
		this.previousButtonClassnames = previousButtonClassnames;
		this.nextButtonClassnames = nextButtonClassnames;
		this.regularButtonClassnames = regularButtonClassnames;
		this.devMode = developmentMode;

		this.init();
	}

	init = () => {
		if (!this.devMode && window.location.protocol === 'http:' && Boolean(window.location.port)) {
			// eslint-disable-next-line no-console
			console.warn(
				'PAGINATION DEV MODE: Use option {devMode: true} for debugging. Read the docs https://www.npmjs.com/package/@digital-butlers/pagination | Используйте опцию {devMode: true} для отладки. Читай документацию https://www.npmjs.com/package/@digital-butlers/pagination',
			);
		}
		if (this.devMode) {
			// eslint-disable-next-line no-console
			console.warn(
				`PAGINATION DEV MODE: Pagination dev mode enabled! Read the docs https://www.npmjs.com/package/@digital-butlers/pagination | В пагинации включен режим разработчика! Читай документацию https://www.npmjs.com/package/@digital-butlers/pagination`,
			);
		}
		const queryPage = this.url.searchParams.get('page');
		this.currentPage = queryPage ? +queryPage : 1;
		this.paginationWrapper = (this.component.querySelector(this.paginationWrapperSelector) as HTMLElement) ?? undefined;
		if (this.paginationWrapper) {
			this.initVariables();
			this.paginationWrapper.addEventListener('click', this.clickHandler);
		} else if (this.devMode) {
			// eslint-disable-next-line no-console
			console.warn('PAGINATION DEV MODE: Pagination wrapper not found | Обертка пагинации не найдена');
		}
		this.on?.afterInit?.(this);
	};

	initVariables = () => {
		this.dynamicElements = Array.from(this.component.querySelectorAll(this.dynamicElementSelector));
		this.totalPages = Math.ceil(this.dynamicElements.length / this.itemsPerPage);
		this.createButtonsMap();
		this.addCustomButtons();
		this.goToCurrent();
	};

	createButtonsMap = () => {
		const result: pageMapItemModel[] = [];
		// eslint-disable-next-line unicorn/no-new-array
		const pages = new Array(this.totalPages).fill('').map((_element, index) => index + 1);
		// eslint-disable-next-line unicorn/consistent-function-scoping
		const isButtonVisible = (value: number): boolean =>
			value === 1 || value === this.totalPages || (value >= this.currentPage - 1 && value <= this.currentPage + 1);

		pages.forEach((element, index) => {
			const mapItem = {
				page: element,
				current: index + 1 === this.currentPage,
			};
			if (isButtonVisible(element) || this.buttons.length < this.hiddenButtons.min) {
				result.push({
					...mapItem,
					visible: true,
				});
			} else if (isButtonVisible(pages[index + 1]) && isButtonVisible(pages[index - 1])) {
				result.push({
					...mapItem,
					visible: true,
				});
			} else {
				result.push({
					...mapItem,
					visible: false,
				});
			}
		});
		this.buttonsMap = result;
	};

	addCustomButtons = () => {
		if (this.totalPages > 1) {
			(this.paginationWrapper as HTMLElement).classList.remove(CLASSES.UNACTIVE);
			this.addButton({
				// targetPage: +this.currentPage - 1,
				label: 'Prev page',
				content: this.previousButtonInner,
				// rel: 'prev',
			});
			this.buttonsMap.forEach(({ page }) => {
				this.addButton({
					label: `Page ${page}`,
					content: page,
					// targetPage: page,
				});
			});
			this.addButton({
				// targetPage: +this.currentPage + 1,
				label: 'Next page',
				content: this.nextButtonInner,
				// rel: 'next',
			});
		} else {
			(this.paginationWrapper as HTMLElement).classList.add(CLASSES.UNACTIVE);
		}
		this.createButtonsMap();
		this.updateButtonsAttrs();
		this.addRelLinks();
	};

	addButton = ({ content, label }: addButtonsPropertiesModel) => {
		const button = document.createElement('button');

		if (typeof content === 'string') {
			button.innerHTML = content;
		} else if (content instanceof Node) {
			button.append(content);
		}
		button.classList.add(CLASSES.BUTTON);
		button.setAttribute('aria-label', label);
		button.setAttribute('type', 'button');
		if (label === 'Prev page') {
			button.classList.add(...this.previousButtonClassnames);
			this.prevButton = button;
		} else if (label === 'Next page') {
			button.classList.add(...this.nextButtonClassnames);
			this.nextButton = button;
		} else {
			button.classList.add(...this.regularButtonClassnames);
			this.buttons.push(button);
		}
		(this.paginationWrapper as HTMLElement).append(button);
	};

	updateButtonsAttrs = () => {
		if (this.currentPage === 1) {
			this.makeDisable(this.prevButton as HTMLButtonElement);
		} else {
			this.makeEnable(this.prevButton as HTMLButtonElement);
		}
		if (this.currentPage === this.totalPages) {
			this.makeDisable(this.nextButton as HTMLButtonElement);
		} else {
			this.makeEnable(this.nextButton as HTMLButtonElement);
		}
		this.buttons.forEach((button, index) => {
			const buttonMapItem = this.buttonsMap[index];
			if (index + 1 === this.currentPage) {
				button.classList.add(CLASSES.CURRENT);
			} else {
				button.classList.remove(CLASSES.CURRENT);
			}
			if (!buttonMapItem.visible || buttonMapItem.current) {
				this.makeDisable(button);
			} else {
				this.makeEnable(button);
			}
			if (buttonMapItem.visible) {
				button.classList.remove(CLASSES.EMPTY_PLACE);
				// eslint-disable-next-line no-param-reassign
				button.textContent = this.pageNumberTransformer(buttonMapItem.page);
			} else {
				button.classList.add(CLASSES.EMPTY_PLACE);
				// eslint-disable-next-line no-param-reassign
				button.textContent = this.emptyMapInner;
			}
			if (buttonMapItem.current) {
				button.classList.add(CLASSES.CURRENT);
			} else {
				button.classList.remove(CLASSES.CURRENT);
			}
		});
	};

	// eslint-disable-next-line class-methods-use-this
	makeDisable = (button: HTMLElement) => {
		if (button) {
			button.setAttribute('disabled', 'true');
			button.setAttribute('tabindex', '-1');
		}
	};

	// eslint-disable-next-line class-methods-use-this
	makeEnable = (button: HTMLElement) => {
		if (button) {
			button.removeAttribute('disabled');
			button.setAttribute('tabindex', '0');
		}
	};

	update = () => {
		(this.paginationWrapper as HTMLElement).innerHTML = '';
		this.buttons = [];
		this.currentPage = 1;
		this.initVariables();
	};

	goToCurrent = () => {
		this.openedElements = [];
		this.dynamicElements.forEach((item, index) => {
			const isActive = Math.ceil((index + 1) / this.itemsPerPage) === this.currentPage;
			if (isActive) {
				item.classList.remove(CLASSES.HIDDEN);
				item.removeAttribute('style');
				item.removeAttribute('inert');
				this.openedElements.push(item);
			} else {
				item.classList.add(CLASSES.HIDDEN);
				item.style.display = 'none';
				item.setAttribute('inert', 'true');
			}
		});
		this.addPageParam();
		this.addRelLinks();
		this.on?.change?.(this);
	};

	addPageParam = () => {
		this.url = new URL(window.location.href);
		this.url.searchParams.set('page', this.currentPage.toString());
		window.history.pushState({}, '', this.url.href);
	};

	clickHandler = (event: MouseEvent) => {
		const targetButton = (event.target as HTMLElement).closest('.js--pagination-button');
		if (targetButton && targetButton.getAttribute('disabled') !== 'true') {
			const targetPage = targetButton.getAttribute('aria-label');
			if (targetPage === 'Prev page') {
				this.currentPage -= 1;
			} else if (targetPage === 'Next page') {
				this.currentPage += 1;
			} else {
				this.currentPage = +(targetPage as string).split(' ')[1];
			}
			this.goToCurrent();
			this.createButtonsMap();
			this.updateButtonsAttrs();
			this.on?.click?.(this);
		}
	};

	addRelLinks = () => {
		const links = document.head.querySelectorAll('link[rel="prev"], link[rel="next"]');
		links.forEach((link) => link.remove());
		if (this.currentPage > 1) {
			const link = document.createElement('link');
			link.setAttribute('rel', 'prev');
			link.setAttribute('href', `${this.url.origin + this.url.pathname}?page=${this.currentPage - 1}`);
			document.head.append(link);
		}
		if (this.currentPage < this.totalPages) {
			const link = document.createElement('link');
			link.setAttribute('rel', 'next');
			link.setAttribute('href', `${this.url.origin + this.url.pathname}?page=${this.currentPage + 1}`);
			document.head.append(link);
		}
	};
}
