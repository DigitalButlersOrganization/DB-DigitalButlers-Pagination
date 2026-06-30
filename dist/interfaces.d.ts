import { Pagination } from './index';
export interface EventModel {
    afterInit?: (pagination: Pagination) => void;
    change?: (pagination: Pagination) => void;
    click?: (pagination: Pagination) => void;
}
export type PageNumberTransformer = (number: number) => string;
export interface ServerModeModel {
    totalPages: number;
}
interface PaginationConfigBaseModel {
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
export type PaginationConfigModel = PaginationConfigBaseModel & ({
    itemsPerPage: number;
    serverMode?: never;
} | {
    serverMode: ServerModeModel;
    itemsPerPage?: never;
});
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
export {};
