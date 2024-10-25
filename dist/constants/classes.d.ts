type jsClassType = `js--${string}`;
export interface ClassesModel {
    [key: string]: jsClassType;
}
export declare const CLASSES: ClassesModel;
export {};
