import { Pagination } from './index';

export interface EventModel {
	afterInit?: (pagination: Pagination) => void;
	change?: (pagination: Pagination) => void;
	click?: (pagination: Pagination) => void;
}

export type PageNumberTransformer = (number: number) => string;

export interface PaginationConfigModel {
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
	// animationLength?: number;
	on?: EventModel;
	previousButtonClassnames?: string[];
	nextButtonClassnames?: string[];
	regularButtonClassnames?: string[];
	devMode?: boolean;
	// tabbuttonsListSelector: string,
	// deletableTabs: boolean,
	// initialTab: number,
	// orientation: OrientationType,
	// equalHeight: boolean,
	// autoplay: AutoPlayModel,
	// on: EventsModel,
}

export interface hiddenButtonsConfigModel {
	min: number;
}

export interface pageMapItemModel {
	page: any;
	visible: boolean;
	current: boolean;
}

export interface addButtonsPropertiesModel {
	content: string | Node;
	label: string;
}
