# Digital Butlers Pagination

A library for creating pagination with flexible settings.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Public Methods](#public-methods)
- [Events](#events)
- [CSS Classes](#css-classes)
- [TypeScript Types](#typescript-types)
- [Accessibility](#accessibility)
- [URL Parameters](#url-parameters)

## Installation

```bash
npm install @digital-butlers/pagination
# or
yarn add @digital-butlers/pagination
# or
pnpm add @digital-butlers/pagination
```

## Quick Start

```typescript
import { Pagination } from '@digital-butlers/pagination';
import '@digital-butlers/pagination/css';

new Pagination('[data-pagination="wrapper"]', {
	itemsPerPage: 10,
});
```

## Configuration

| Parameter                   | Type                         | Default                           | Description                               |
| --------------------------- | ---------------------------- | --------------------------------- | ----------------------------------------- |
| `paginationWrapperSelector` | `string`                     | `'[data-pagination="container"]'` | CSS selector for pagination container     |
| `dynamicElementSelector`    | `string`                     | `'.w-dyn-item[role="listitem"]'`  | CSS selector for paginated elements       |
| `previousButtonInner`       | `string \| Node`             | `'Prev'`                          | Content for "Previous" button             |
| `nextButtonInner`           | `string \| Node`             | `'Next'`                          | Content for "Next" button                 |
| `previousButtonClassnames`  | `string[]`                   | `[]`                              | Additional classes for "Previous" button  |
| `nextButtonClassnames`      | `string[]`                   | `[]`                              | Additional classes for "Next" button      |
| `regularButtonClassnames`   | `string[]`                   | `[]`                              | Additional classes for number buttons     |
| `itemsPerPage`              | `number`                     | -                                 | Number of items per page                  |
| `emptyMapInner`             | `string`                     | `'...'`                           | Text for skipped page numbers             |
| `pageNumberTransformer`     | `(number: number) => string` | `(n) => n.toString()`             | Function to transform page numbers        |
| `hiddenButtons`             | `{ min: number }`            | `{ min: 6 }`                      | Minimum number of visible buttons         |
| `devMode`                   | `boolean`                    | `false`                           | Development mode with additional warnings |

## Public Methods

| Method           | Description                |
| ---------------- | -------------------------- |
| `update()`       | Updates pagination state   |
| `goToCurrent()`  | Goes to current page       |
| `addPageParam()` | Adds page parameter to URL |

### Method Usage Examples

```typescript
const pagination = new Pagination('[data-pagination="wrapper"]', {
	itemsPerPage: 10,
});

// Update after data changes
pagination.update();

// Go to current page
pagination.goToCurrent();
```

## Events

| Event       | Parameters                 | Description                 |
| ----------- | -------------------------- | --------------------------- |
| `afterInit` | `(pagination: Pagination)` | Called after initialization |
| `change`    | `(pagination: Pagination)` | Called on page change       |
| `click`     | `(pagination: Pagination)` | Called on button click      |

```typescript
new Pagination('[data-pagination="wrapper"]', {
	itemsPerPage: 10,
	on: {
		afterInit: (pagination) => console.log('Initialization completed'),
		change: (pagination) => console.log('Current page:', pagination.currentPage),
		click: (pagination) => console.log('Button clicked'),
	},
});
```

## CSS Classes

| Class                         | Description                           |
| ----------------------------- | ------------------------------------- |
| `.js--pagination-button`      | Base class for all pagination buttons |
| `.js--pagination-current`     | Class for current active page         |
| `.js--pagination-empty-place` | Class for skipped page numbers        |
| `.js--unactive`               | Class for inactive pagination         |
| `.js--hidden-by-pagination`   | Class for hidden elements             |
| `.js--active`                 | Class for active elements             |
| `.js--visible`                | Class for visible elements            |

## TypeScript Types

```typescript
interface PaginationConfigModel {
	paginationWrapperSelector?: string;
	dynamicElementSelector?: string;
	previousButtonInner?: string | Node;
	nextButtonInner?: string | Node;
	itemsPerPage: number;
	pageNumberTransformer?: PageNumberTransformer;
	emptyMapInner?: string;
	hiddenButtons?: {
		min: number;
	};
	on?: EventModel;
	previousButtonClassnames?: string[];
	nextButtonClassnames?: string[];
	regularButtonClassnames?: string[];
	devMode?: boolean;
}

interface EventModel {
	afterInit?: (pagination: Pagination) => void;
	change?: (pagination: Pagination) => void;
	click?: (pagination: Pagination) => void;
}

type PageNumberTransformer = (number: number) => string;
```

## Accessibility

The library automatically adds:

- `aria-label` for all buttons
- `role="button"` for navigation elements
- Keyboard navigation support
- `inert` attribute for hidden elements
- `disabled` attribute for inactive buttons
- Proper `tabindex` values

## URL Parameters

The library automatically:

- Adds `page` parameter to URL
- Synchronizes state with URL
- Supports browser history navigation
- Adds `rel="prev"` and `rel="next"` for SEO

## License

MIT
