## API

### Config Properties

### `paginationWrapperSelector`

_Type:_ `string`
_Default:_ `'[data-pagination="container"]'`
_Description:_ CSS selector for the pagination container.

### `dynamicElementSelector`

_Type:_ `string`
_Default:_ `'.w-dyn-item[role="listitem"]'`
_Description:_ CSS selector for dynamic elements within the pagination.

### `previousButtonInner`

_Type:_ `string`
_Default:_ `'Prev'`
_Description:_ Inner content for the previous button.

### `nextButtonInner`

_Type:_ `string`
_Default:_ `'Next'`
_Description:_ Inner content for the next button.

### `previousButtonClassnames`

_Type:_ `string[]`
_Default:_ `[]`
_Description:_ Class names for the previous button.

### `nextButtonClassnames`

_Type:_ `string[]`
_Default:_ `[]`
_Description:_ Class names for the next button.

### `regularButtonClassnames`

_Type:_ `string[]`
_Default:_ `[]`
_Description:_ Class names for the regular buttons.

### `itemsPerPage`

_Type:_ `number`
_Description:_ Number of items per page.

### `emptyMapInner`

_Type:_ `string`
_Default:_ `'...'`
_Description:_ Inner content for empty map items.

### `devMode`

_Type:_ `boolean`
_Default:_ `false`
_Description:_ Enable dev mode.

### `pageNumberTransformer`

_Type:_ `(number: number) => string`
_Default:_ `(number: number) => number.toString()`
_Description:_ Function to transform page numbers.

### `hiddenButtons`

_Type:_ `hiddenButtonsConfigModel`
_Default:_ `{ min: 6 }`
_Description:_ Configuration for hidden buttons.

### `on`

_Type:_ `EventModel`
_Default:_ `{}`
_Description:_ Event callbacks for pagination events.

#### Events callback config object

### `afterInit`

_Type:_ `function`
_Default:_ `undefined`
_Description:_ Callback will be started after pagination initialization.

### `change`

_Type:_ `function`
_Default:_ `undefined`
_Description:_ Callback will be started after page change event.

### `click`

_Type:_ `function`
_Default:_ `undefined`
_Description:_ Callback will be started after pagination click event.
