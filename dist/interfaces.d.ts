import { Pagination } from './index';
export interface EventModel {
    afterInit?: (pagination: Pagination) => {};
    change?: (pagination: Pagination) => {};
}
export interface PaginationConfigModel {
    paginationWrapperSelector?: string;
    dynamicElementSelector?: string;
    previousButtonInner?: string;
    nextButtonInner?: string;
    itemsPerPage: number;
    hiddenButtons?: {
        min: number;
    };
    animationLength: number;
    on?: EventModel;
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
