import { Pagination } from './index';
export interface EventModel {
    afterInit?: (pagination: Pagination) => {};
    change?: (pagination: Pagination) => {};
}
export type PageNumberTransformer = (number: number) => string;
export interface PaginationConfigModel {
    paginationWrapperSelector?: string;
    dynamicElementSelector?: string;
    previousButtonInner?: string;
    nextButtonInner?: string;
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
    content: string;
    label: string;
}
