## API

### Config Properties

### `openClass`

_Type:_ `string`
_Default:_ `'js--open'`
_Description:_ The class that will be added to the active accordion item

### `parentElement`

_Type:_ `HTMLElement | Document`
_Default:_ `document`
_Description:_ Any node that is the parent of an accordion. It is advisable to specify the nearest parent

### `accordionSelector`

_Type:_ `string`
_Default:_ `'[data-role="accordion"]'`
_Description:_ Css selector for wrapping all accordion elements

### `itemSelector`

_Type:_ `string`
_Default:_ `'[data-role="accordion-item"]'`
_Description:_ Css selector for creating a separate element inside the accordion, which will include "summary" and "details"

### `summarySelector`

_Type:_ `string`
_Default:_ `'[data-role="accordion-summary"]'`
_Description:_ Css selector for creating a "summary" inside a separate accordion item

### `detailsSelector`

_Type:_ `string`
_Default:_ `'[data-role="accordion-details"]'`
_Description:_ Css selector for creating a "details" inside a separate accordion item

### `breakpoint`

_Type:_ `MediaQueryList`
_Default:_ `window.matchMedia('screen')`
_Description:_ prevents changing the accordions if the breakpoint does not match the window.matchmedia

### `isSingle`

_Type:_ `AccordionCallbacks`
_Default:_ `false`
_Description:_ If set to 'true', then only one active accordion element can be turned on at a time

### `on`

_Type:_ `object`
_Description:_ Callbacks that can be initialized after some events with accordions

#### Events callback config object

### `detailsTransitionEnd`

_Type:_ `function`
_Default:_ `undefined`
_Description:_ Callback will be started after every transition end

### `open`

_Type:_ `function`
_Default:_ `undefined`
_Description:_ Callback will be started after every accordion open event

### `close`

_Type:_ `function`
_Default:_ `undefined`
_Description:_ Callback will be started after every accordion close event

### `toggle`

_Type:_ `function`
_Default:_ `undefined`
_Description:_ Callback will be started after every accordion changing event

### `beforeInit`

_Type:_ `function`
_Default:_ `undefined`
_Description:_ Callback will be started before accordion initialization

### `afterInit`

_Type:_ `function`
