# Digital Butlers Pagination

A library for creating pagination with flexible settings.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Server mode](#server-mode)
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
| `serverMode`                | `{ totalPages: number }`     | -                                 | Server-side pagination mode (see [Server mode](#server-mode)) |
| `devMode`                   | `boolean`                    | `false`                           | Development mode with additional warnings |

> **Note:** provide either `itemsPerPage` (client mode) or `serverMode` (server mode). `serverMode` takes priority.

## Server mode

Use this when pages are rendered on the server and data is fetched per request instead of slicing DOM elements on the client.

When `serverMode` is set:

- page count comes from `serverMode.totalPages`, not from DOM elements;
- `dynamicElementSelector` and `itemsPerPage` are ignored;
- on click, list items are **not** hidden and **no** attributes are applied (`inert`, `display: none`, etc.);
- only the `page` URL parameter is updated;
- the `change` event fires — use it to fetch new data from the server;
- the `click` event works as usual.

```typescript
import { Pagination } from '@digital-butlers/pagination';
import '@digital-butlers/pagination/css';

const pagination = new Pagination('[data-pagination="wrapper"]', {
	serverMode: {
		totalPages: 12,
	},
	on: {
		change: async (p) => {
			const response = await fetch(`/api/items?page=${p.currentPage}`);
			const data = await response.json();
			renderItems(data);
		},
	},
});
```

To update the page count after a server response, set `pagination.serverMode.totalPages` and call `pagination.update()`.

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
interface ServerModeModel {
	totalPages: number;
}

type PaginationConfigModel = PaginationConfigBase & (
	| { itemsPerPage: number; serverMode?: never }
	| { serverMode: ServerModeModel; itemsPerPage?: never }
);

interface PaginationConfigBase {
	paginationWrapperSelector?: string;
	dynamicElementSelector?: string;
	previousButtonInner?: string | Node;
	nextButtonInner?: string | Node;
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
