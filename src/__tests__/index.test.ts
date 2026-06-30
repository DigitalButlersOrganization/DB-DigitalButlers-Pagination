import { describe, it, expect, beforeEach, jest } from '@jest/globals';
import { Pagination } from '../index';
// import { CLASSES } from '../constants';

describe('Hello World Test', () => {
	it('should return hello world', () => {
		const message = 'hello world';

		expect(message).toBe('hello world');
	});

	describe('Pagination', () => {
		let pagination: Pagination;
		let component: HTMLElement;

		beforeEach(() => {
			document.body.innerHTML = `
				<div data-pagination="wrapper">
					<div data-pagination="container"></div>
					<div class="w-dyn-item" role="listitem"></div>
					<div class="w-dyn-item" role="listitem"></div>
					<div class="w-dyn-item" role="listitem"></div>
				</div>
			`;
			component = document.querySelector('[data-pagination="wrapper"]') as HTMLElement;
			pagination = new Pagination(component, {
				itemsPerPage: 1,
			});
		});

		it('should initialize with default values', () => {
			expect(pagination.currentPage).toBe(1);
			expect(pagination.totalPages).toBe(3);
			expect(pagination.dynamicElements.length).toBe(3);
		});

		it('should create buttons map correctly', () => {
			pagination.createButtonsMap();
			expect(pagination.buttonsMap.length).toBe(3);
			expect(pagination.buttonsMap[0].page).toBe(1);
			expect(pagination.buttonsMap[1].page).toBe(2);
			expect(pagination.buttonsMap[2].page).toBe(3);
		});

		it('should add custom buttons', () => {
			pagination.addCustomButtons();
			expect(pagination.buttons.length).toBe(3);
			expect(pagination.prevButton).toBeDefined();
			expect(pagination.nextButton).toBeDefined();
		});

		it('should disable previous button on first page', () => {
			pagination.updateButtonsAttrs();
			expect(pagination.prevButton?.getAttribute('disabled')).toBe('true');
			expect(pagination.nextButton?.getAttribute('disabled')).toBeNull();
		});

		it('should disable next button on last page', () => {
			pagination.currentPage = 3;
			pagination.updateButtonsAttrs();
			expect(pagination.nextButton?.getAttribute('disabled')).toBe('true');
			expect(pagination.prevButton?.getAttribute('disabled')).toBeNull();
		});

		it('should go to the correct page on button click', () => {
			const nextButton = pagination.nextButton as HTMLElement;
			nextButton.click();
			expect(pagination.currentPage).toBe(2);

			const previousButton = pagination.prevButton as HTMLElement;
			previousButton.click();
			expect(pagination.currentPage).toBe(1);
		});

		it('should update URL with page parameter', () => {
			const spy = jest.spyOn(window.history, 'pushState');
			pagination.addPageParam();
			expect(spy).toHaveBeenCalledWith({}, '', expect.stringContaining('page=1'));
		});
	});

	describe('Pagination (server mode)', () => {
		let pagination: Pagination;
		let component: HTMLElement;
		const changeHandler = jest.fn();
		const clickHandler = jest.fn();

		beforeEach(() => {
			document.body.innerHTML = `
				<div data-pagination="wrapper">
					<div data-pagination="container"></div>
					<div class="w-dyn-item" role="listitem"></div>
					<div class="w-dyn-item" role="listitem"></div>
					<div class="w-dyn-item" role="listitem"></div>
				</div>
			`;
			component = document.querySelector('[data-pagination="wrapper"]') as HTMLElement;
			changeHandler.mockClear();
			clickHandler.mockClear();
			pagination = new Pagination(component, {
				serverMode: {
					totalPages: 5,
				},
				on: {
					change: changeHandler,
					click: clickHandler,
				},
			});
		});

		it('should use totalPages from serverMode instead of dynamic elements', () => {
			expect(pagination.totalPages).toBe(5);
			expect(pagination.dynamicElements.length).toBe(0);
			expect(pagination.buttons.length).toBe(5);
		});

		it('should not hide dynamic elements on page change', () => {
			const items = Array.from(component.querySelectorAll('.w-dyn-item')) as HTMLElement[];
			pagination.currentPage = 2;
			pagination.goToCurrent();

			items.forEach((item) => {
				expect(item.classList.contains('js--hidden-by-pagination')).toBe(false);
				expect(item.style.display).not.toBe('none');
				expect(item.hasAttribute('inert')).toBe(false);
			});
		});

		it('should update URL and fire change on page navigation', () => {
			const pushStateSpy = jest.spyOn(window.history, 'pushState');
			const nextButton = pagination.nextButton as HTMLElement;

			nextButton.click();

			expect(pagination.currentPage).toBe(2);
			expect(pushStateSpy).toHaveBeenCalledWith({}, '', expect.stringContaining('page=2'));
			expect(changeHandler).toHaveBeenCalledWith(pagination);
			expect(clickHandler).toHaveBeenCalledWith(pagination);
		});
	});
});
