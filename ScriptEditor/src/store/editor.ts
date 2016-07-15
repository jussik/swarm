import {createAction} from "redux-actions";

export const RESET = "editor/RESET";
export const STATE_LOADED = "editor/STATE_LOADED";

export const reset = createAction(RESET);
export const stateLoaded = createAction(STATE_LOADED);
