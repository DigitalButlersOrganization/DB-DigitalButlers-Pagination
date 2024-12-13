const PREFIX = 'js--';

type jsClassType = `js--${string}`;

export interface ClassesModel {
	[key: string]: jsClassType;
}

export const CLASSES: ClassesModel = {
	ACTIVE: `${PREFIX}active`,
	UNACTIVE: `${PREFIX}unactive`,
	VISIBLE: `${PREFIX}visible`,
	BUTTON: `${PREFIX}pagination-button`,
	CURRENT: `${PREFIX}pagination-current`,
	EMPTY_PLACE: `${PREFIX}pagination-empty-place`,
	HIDDEN: `${PREFIX}hidden-by-pagination`,
};
