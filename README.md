# Digital Butlers Pagination

Библиотека для создания пагинации с гибкими настройками.

## Содержание

- [Установка](#установка)
- [Быстрый старт](#быстрый-старт)
- [Конфигурация](#конфигурация)
- [Публичные методы](#публичные-методы)
- [События](#события)
- [CSS классы](#css-классы)
- [TypeScript типы](#typescript-типы)
- [Доступность](#доступность)
- [URL параметры](#url-параметры)

## Установка

```bash
npm install @digital-butlers/pagination
# или
yarn add @digital-butlers/pagination
# или
pnpm add @digital-butlers/pagination
```

## Быстрый старт

```typescript
import { Pagination } from '@digital-butlers/pagination';
import '@digital-butlers/pagination/css';

new Pagination('[data-pagination="wrapper"]', {
	itemsPerPage: 10,
});
```

## Конфигурация

| Параметр                    | Тип                          | По умолчанию                      | Описание                                            |
| --------------------------- | ---------------------------- | --------------------------------- | --------------------------------------------------- |
| `paginationWrapperSelector` | `string`                     | `'[data-pagination="container"]'` | CSS селектор контейнера пагинации                   |
| `dynamicElementSelector`    | `string`                     | `'.w-dyn-item[role="listitem"]'`  | CSS селектор элементов для пагинации                |
| `previousButtonInner`       | `string \| Node`             | `'Prev'`                          | Содержимое кнопки "Назад"                           |
| `nextButtonInner`           | `string \| Node`             | `'Next'`                          | Содержимое кнопки "Вперед"                          |
| `previousButtonClassnames`  | `string[]`                   | `[]`                              | Дополнительные классы для кнопки "Назад"            |
| `nextButtonClassnames`      | `string[]`                   | `[]`                              | Дополнительные классы для кнопки "Вперед"           |
| `regularButtonClassnames`   | `string[]`                   | `[]`                              | Дополнительные классы для кнопок с номерами         |
| `itemsPerPage`              | `number`                     | -                                 | Количество элементов на странице                    |
| `emptyMapInner`             | `string`                     | `'...'`                           | Текст для пропущенных номеров страниц               |
| `pageNumberTransformer`     | `(number: number) => string` | `(n) => n.toString()`             | Функция преобразования номеров страниц              |
| `hiddenButtons`             | `{ min: number }`            | `{ min: 6 }`                      | Минимальное количество видимых кнопок               |
| `devMode`                   | `boolean`                    | `false`                           | Режим разработки с дополнительными предупреждениями |

## Публичные методы

| Метод            | Описание                          |
| ---------------- | --------------------------------- |
| `update()`       | Обновляет состояние пагинации     |
| `goToCurrent()`  | Переходит на текущую страницу     |
| `addPageParam()` | Добавляет параметр страницы в URL |

## События

| Событие     | Параметры                  | Описание                       |
| ----------- | -------------------------- | ------------------------------ |
| `afterInit` | `(pagination: Pagination)` | Вызывается после инициализации |
| `change`    | `(pagination: Pagination)` | Вызывается при смене страницы  |
| `click`     | `(pagination: Pagination)` | Вызывается при клике на кнопку |

```typescript
new Pagination('[data-pagination="wrapper"]', {
	itemsPerPage: 10,
	on: {
		afterInit: (pagination) => console.log('Инициализация завершена'),
		change: (pagination) => console.log('Текущая страница:', pagination.currentPage),
		click: (pagination) => console.log('Клик по кнопке'),
	},
});
```

## CSS классы

| Класс                         | Описание                                |
| ----------------------------- | --------------------------------------- |
| `.js--pagination-button`      | Базовый класс для всех кнопок пагинации |
| `.js--pagination-current`     | Класс для текущей активной страницы     |
| `.js--pagination-empty-place` | Класс для пропущенных номеров страниц   |
| `.js--unactive`               | Класс для неактивной пагинации          |
| `.js--hidden-by-pagination`   | Класс для скрытых элементов             |
| `.js--active`                 | Класс для активных элементов            |
| `.js--visible`                | Класс для видимых элементов             |

## TypeScript типы

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

## Доступность

Библиотека автоматически добавляет:

- `aria-label` для всех кнопок
- `role="button"` для элементов навигации
- Поддержку клавиатурной навигации
- Атрибут `inert` для скрытых элементов
- Атрибут `disabled` для неактивных кнопок
- Корректные значения `tabindex`

## URL параметры

Библиотека автоматически:

- Добавляет параметр `page` в URL
- Синхронизирует состояние с URL
- Поддерживает навигацию по истории браузера
- Добавляет `rel="prev"` и `rel="next"` для SEO

## Лицензия

MIT
