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
});
