const PREFIX = 'js--';

type jsClassType = `js--${string}`;

export interface ClassesModel {
	[key: string]: jsClassType;
}

export const CLASSES: ClassesModel = {
	ACTIVE: `${PREFIX}active`,
	UNACTIVE: `${PREFIX}unactive`,
	VISIBLE: `${PREFIX}visible`,
	TAB: `${PREFIX}tab`,
	PANEL: `${PREFIX}panel`,
	TABS_WRAPPER: `${PREFIX}tabs-wrapper`,
	TAB_LIST: `${PREFIX}tab-list`,
	PANEL_LIST: `${PREFIX}panel-list`,
	BUTTON: `${PREFIX}pagination-button`,
	CURRENT: `${PREFIX}pagination-current`,
	EMPTY_PLACE: `${PREFIX}pagination-empty-place`,
};
